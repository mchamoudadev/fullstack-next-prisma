import React from 'react'
import ProductCard from './_components/ProductCard';
import { Product } from '@prisma/client';
import { ParsedUrlQuery } from 'querystring';



interface SearchParams extends ParsedUrlQuery {
    category?: string;
    sort?: 'price-asc' | 'price-desc' | 'latest-desc' | string;
}


const SearchPage = async ({ searchParams }: { searchParams: SearchParams }) => {

    const category = searchParams.category;

    const sort = searchParams?.sort

    let orderBy = {}

    if (sort === 'price-asc') {
        orderBy = { price: "asc" }
    } else if (sort === 'price-desc') {
        orderBy = { price: "desc" }
    } else if (sort === 'latest-desc') {
        orderBy = { created: "desc" }
    }


    let products: Product[] = [];

    try {
        products = await prisma!.product.findMany({
            where: category ? {
                category: {
                    id: category
                }
            } : {},
            orderBy: orderBy
        });
    } catch (error) {
        products = []
    }

    if (products && products.length <= 0) return <h1>no products found</h1>
    return (
        <>
            {
                products?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            }
        </>
    )
}

export default SearchPage