"use client"
import { Input } from '@/components/ui/input'
import { Search, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

const Navbar = () => {


    const [searchValue, setSearchValue] = useState("")

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="flex justify-between items-center">
                <Link href={'/search'} className="flex-1">
                    <h1 className='text-white font-bold text-2xl'>Logo</h1>
                </Link>

                <div className="flex-1 max-w-xl relative">
                    <Input
                        type="search"
                        placeholder="Search for products..."
                        className="w-full p-2 pl-10 rounded-md text-black text-lg"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    {!searchValue
                        &&
                        <Search className='absolute top-3 right-3 text-gray-500 h-4 w-4' />
                    }
                </div>

                <div className="flex justify-end items-center flex-1">
                    <ShoppingBag />
                </div>
            </div>


        </nav>
    )
}

export default Navbar