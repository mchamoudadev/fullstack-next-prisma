"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const SortingOptions = () => {

    const sortingOptions = [
        { name: 'Latest arrivals', query: 'sort=latest-desc' },
        { name: 'Price: Low to high', query: 'sort=price-asc' },
        { name: 'Price: High to low', query: 'sort=price-desc' },
    ];


    const pathName = usePathname();

    const category = pathName.split('/')[2];

    return (
        <div>
            <div className='mb-4 text-lg'>Sort by</div>
            <ul>
                {
                    sortingOptions.map((option) => (

                        <li key={option.name} className='py-2'>
                            <Link href={
                                {
                                    pathname: category ? `/search/${category}` : '/search',
                                    query: { sort: option.query.split("=")[1] }
                                }
                            }>
                                <span className='text-white hover:text-gray-300'>
                                    {option.name}
                                </span>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default SortingOptions