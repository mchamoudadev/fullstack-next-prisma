"use client"
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Search, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import Cart from './Cart'
import { useShoppingCart } from '@/hooks/useCart'

const Navbar = () => {


    const [searchValue, setSearchValue] = useState("");

    const { cartItems } = useShoppingCart()

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

                    <Sheet>
                        <SheetTrigger className='pr-4 hover:opacity-75 transition'>
                            <div className="group -m-2 flex items-center p-2">
                                <ShoppingBag
                                    className="h-6 w-6 flex-shrink-0 text-gray-50 group-hover:text-gray-100"
                                    aria-hidden="true"
                                />

                                <span className="ml-2 text-sm font-medium text-gray-100 group-hover:text-gray-100">{cartItems?.length}</span>
                            </div>
                        </SheetTrigger>
                        <SheetContent className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-4'>
                            <Cart />
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    )
}

export default Navbar