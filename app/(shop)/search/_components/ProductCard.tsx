import { Product } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

const ProductCard = ({ product }: { product: Product }) => {
    return (
        <Link href={`/product/${product.id}`} key={product.id} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
            </div>

            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        {/* implement link to show individual product */}
                        <span>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                        </span>
                    </h3>
                </div>
                <p className="text-sm font-medium text-gray-900">${product.price}</p>
            </div>
        </Link>
    )
}

export default ProductCard