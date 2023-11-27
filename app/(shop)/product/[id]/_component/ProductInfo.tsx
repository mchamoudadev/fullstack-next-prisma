"use client"

import { Button } from '@/components/ui/button'
import { useShoppingCart } from '@/hooks/useCart'
import { cn } from '@/lib/utils'
import { Product } from '@prisma/client'
import React, { useState } from 'react'

const ProductInfo = ({ productInfo }: { productInfo: Product }) => {

    const [selectedImage, setSelectedImage] = useState(productInfo.thumbnail);

    const { addToCart } = useShoppingCart()

    const handleAddToCart = () => {
        addToCart({
            id: productInfo.id,
            name: productInfo.name,
            price: productInfo.price,
            description: productInfo.description,
            quantity: 1,
            thumbnailUrl: productInfo.thumbnail,
        });
    };


    return (
        <div className='bg-white'>
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                    {/* thumbnail and gallery */}
                    <div className="flex flex-col-reverse">
                        <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                            <div className="grid grid-cols-4 gap-6">
                                {
                                    productInfo.gallery.map((image, index) => (
                                        <div
                                            onClick={() => setSelectedImage(image)}
                                            key={index}
                                            className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                                        >

                                            <span className="absolute inset-0 overflow-hidden rounded-md">
                                                <img src={image} alt={productInfo.name} className="h-full w-full object-cover object-center" />
                                            </span>

                                            <span
                                                className={cn(
                                                    selectedImage === image ? 'ring-main-500' : 'ring-transparent',
                                                    'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                                                )}
                                                aria-hidden="true"
                                            />

                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        {/* thumbnail */}

                        <div className='aspect-h-1 aspect-w-1 w-full'>
                            <div>
                                <img src={selectedImage} alt="" className='h-full w-full object-cover object-center sm:rounded-lg' />
                            </div>
                        </div>

                    </div>

                    {/* product info */}
                    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{productInfo.name}</h1>

                        <div className="mt-3">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl tracking-tight text-gray-900">${productInfo.price}</p>
                        </div>

                        <div className="mt-6">
                            <h3 className="sr-only">Description</h3>
                            <span
                                className="space-y-6 text-base text-gray-700"
                            >
                                {productInfo.description}
                            </span>
                        </div>


                        <div className="sm:flex-col1 mt-10 flex">
                            <Button
                                onClick={handleAddToCart}
                                type="submit"

                            >
                                Add to bag
                            </Button>
                        </div>

                    </div>


                </div>
            </div>
        </div>
    )
}

export default ProductInfo