"use client"
import { productSchema } from '@/app/validationSchema/productSchema'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import axios from 'axios'
import { API } from '@/lib/config'

import toast, { Toaster } from 'react-hot-toast';

import { useRouter } from 'next/navigation'

import { useQueryClient } from '@tanstack/react-query'
import { Product } from '@prisma/client'
import { CameraIcon, Loader2, XIcon } from 'lucide-react'
import ProductIdSelect from './ProductIdSelect'
import { Textarea } from '@/components/ui/textarea'

import { useDropzone } from 'react-dropzone'
import { deleteFromS3 } from '@/app/actions/deleteFroms3'


interface FileWithPreview extends File {
    preview: string;
}


const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result as string);

    reader.onerror = (error) => reject(error)




})


const ProductForm = ({ product }: { product?: Product }) => {

    const router = useRouter();

    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: product?.name,
            price: product?.price,
            categoryId: product?.categoryId,
            gallery: product?.gallery,
            stockQuantity: product?.stockQuantity,
            description: product?.description
        }
    })

    const [loading, setLoading] = useState(false)

    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>(product ? product.gallery : []);


    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*' as any,
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, { preview: URL.createObjectURL(file) })))
        }
    })

    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index))
    }

    // Cleanup previews
    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const removeExistingImage = async (url: string, productId?: string) => {

        if (!confirm('Are you sure you want to remove')) return
        setLoading(true);
        setExistingImages(exist => exist.filter(image => image !== url));

        const removeFromS3 = await deleteFromS3(url, existingImages, productId);

        if (removeFromS3.error) {
            toast.error("Error deleting existing image: please try again")
            setLoading(false);
        } else {
            toast.success("image removed successfully")
            setLoading(false);

        }

    }


    const onSubmit = async (values: z.infer<typeof productSchema>) => {

        try {
            const formData = new FormData();

            Object.keys(values).forEach(key => {
                if (key !== 'gallery') {
                    const value = values[key as keyof typeof values];
                    if (value !== undefined) {
                        formData.append(key, value.toString())
                    }
                }
            })


            for (const file of files) {
                const base64 = await toBase64(file)
                formData.append('newImages', base64)
            }

            existingImages.forEach(url => formData.append('existingImages', url))


            if (product) {
                await axios.patch(`${API}/admin/product/${product.id}`, formData);
            } else {
                await axios.post(`${API}/admin/product`, formData);
            }

            queryClient.invalidateQueries({ queryKey: ["product"] })

            toast.success(`Successfully ${product ? "Updated" : "created"} product`);
            router.push('/dashboard/admin/product')

        } catch (err) {

            toast.error("Unknown error please try again")
        }
    }


    return (
        <>
            <Card className='max-w-xl mx-auto my-10'>
                <CardHeader>
                    <CardTitle>{product ? "Update Product" : "Register New Product"} </CardTitle>
                    <CardDescription>{product ? "Update product info" : "register new product"} </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter product name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="categoryId"
                                render={({ field }) => (
                                    <ProductIdSelect control={form.control} />
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Price</FormLabel>
                                        <FormControl>
                                            <Input type='number' placeholder="Enter product price" {...field}
                                                value={field.value}
                                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                            />

                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="stockQuantity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product stockQuantity</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter product stockQuantity" {...field}
                                                value={field.value}
                                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Enter product description " {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="gallery"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product gallery</FormLabel>
                                        <FormControl>
                                            <div {...getRootProps()} className='dropzone'>
                                                <input  {...getInputProps} />
                                                <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>

                                                    <div className='text-center'>
                                                        <CameraIcon className='h-10 w-10 text-gray-900/25' />
                                                    </div>

                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* new images */}
                            <div className='flex flex-wrap mt-4'>
                                {
                                    files.map((file, index) =>
                                        <div key={index} className='relative m-2'>
                                            <img alt={file.name} src={file.preview} className='w-24 h-24 object-cover rounded-md' />
                                            <button
                                                onClick={() => removeFile(index)}
                                                className='absolute top-0 right-0 bg-red-500 text-white rounded-full p-1'>
                                                <XIcon className='text-white w-5 h-5' />
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                            {/* existing images */}

                            <div className="flex flex-wrap mt-4">
                                {existingImages.map((url, index) => (
                                    <div key={index} className="relative m-2">
                                        <img src={url} alt={`Product Image ${index}`} className="w-24 h-24 object-cover rounded-md" />
                                        <button onClick={() => removeExistingImage(url, product?.id)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1">
                                            <XIcon className='w-5 h-5' />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <SubmitButtonWithContent loading={form.formState.isSubmitting || loading} isUpdate={!!product} />
                        </form>

                    </Form>
                </CardContent>
            </Card>
            <Toaster />
        </>
    )
}

export default ProductForm


export const SubmitButtonWithContent = ({ loading, isUpdate }: { loading: boolean, isUpdate: boolean }) => {

    if (loading) {
        return (
            <Button className='space-x-2 gap-x-1'>
                {isUpdate ? "Updating" : "Registering"}
                Product <Loader2 className='animate-spin h-5 w-5 text-white mx-2' />
            </Button>
        )
    }

    return <Button type='submit'>
        {isUpdate ? "Update Product" : "Register Product"}
    </Button>


}