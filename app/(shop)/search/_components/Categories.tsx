"use client"

import { API } from '@/lib/config'
import { Category } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import SearchPageLoading from '../loading'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const Categories = () => {

    const { data, isLoading } = useQuery<Category[]>({
        queryKey: ["category"],
        queryFn: () => axios.get(`${API}/admin/category`).then(res => res.data),
        staleTime: 0, // 60 seconds
        retry: 3,
    })

    const searchParams = useSearchParams();

    const sortParams = searchParams.get('sort');

    if (isLoading) return <SearchPageLoading />

    return (
        <div>
            <div className='mb-4 text-lg'>Shop by collection</div>
            <ul>
                {
                    data?.map(category => {

                        const categoryPath = category.name === "All" ? '' : `/${category.id}`

                        return (
                            <li key={category.id} className='py-2'>
                                {/* Make this dynmic */}
                                <Link href={
                                    {
                                        pathname: `/search/${categoryPath}`,
                                        query: sortParams ? { sort: sortParams } : {}
                                    }
                                }>
                                    <span className='text-white hover:text-gray-300'>
                                        {category.name}
                                    </span>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Categories