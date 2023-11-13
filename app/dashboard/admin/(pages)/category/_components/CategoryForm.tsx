"use client"
import { categorySchema } from '@/app/validationSchema/categorySchema'
import React from 'react'
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
import { Category } from '@prisma/client'
import { Loader2 } from 'lucide-react'


const CategoryForm = ({ category }: { category?: Category }) => {

    const router = useRouter();

    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: category?.name
        }
    })


    const onSubmit = async (values: z.infer<typeof categorySchema>) => {

        try {
            if (category) {
                await axios.patch(`${API}/admin/category/${category.id}`, values);
            }else{
                  await axios.post(`${API}/admin/category`, values);
            }
        
            queryClient.invalidateQueries({ queryKey: ["category"] })

            toast.success(`Successfully ${category ? "Updated" : "created"} category`);
            router.push('/dashboard/admin/category')
           
        } catch (err) {

            toast.error("Unknown error please try again")
        }

    }


    return (
        <>
            <Card className='max-w-xl mx-auto my-10'>
                <CardHeader>
                    <CardTitle>{category ? "Update Category" : "Register New Category"} </CardTitle>
                    <CardDescription>{category ? "Update category info" : "register new category"} </CardDescription>
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
                                            <Input placeholder="Enter category name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* <Button type="submit">{form.formState.isSubmitting ? category ? "Updating..." : "Registering..." : category ? "Update" : "Submit"}</Button> */}
                            <SubmitButtonWithContent loading={form.formState.isSubmitting} isUpdate={!!category} />
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <Toaster />
        </>
    )
}

export default CategoryForm


export const SubmitButtonWithContent = ({ loading, isUpdate }: { loading: boolean, isUpdate: boolean }) => {

    if (loading) {
        return (
            <Button className='space-x-2 gap-x-1'>
                {isUpdate ? "Updating" : "Registering"}
                Category <Loader2 className='animate-spin h-5 w-5 text-white mx-2' />
            </Button>
        )
    }

    return <Button type='submit'>
        {isUpdate ? "Update Category" : "Register Category"}
    </Button>


}