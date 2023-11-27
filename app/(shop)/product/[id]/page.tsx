import { notFound } from 'next/navigation'
import React from 'react'
import ProductInfo from './_component/ProductInfo';
import { Product } from '@prisma/client';

const ProductInfoPage = async ({ params }: { params: { id: string } }) => {

    let productInfo = null;

    try {
        productInfo = await prisma?.product.findUnique({ where: { id: params.id } })!
    } catch (error) {
        console.log("error at product info page:", error)
        productInfo = null
        return notFound();
    }


    return (
        <div>
            <ProductInfo productInfo={productInfo!} />
        </div>
    )
}

export default ProductInfoPage