import React, { ReactNode } from 'react'
import Categories from './_components/Categories'
import SortingOptions from './_components/SortingOptions'

const ShopLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='flex flex-col min-h-screen'>
            <div className='flex-grow flex'>


                {/* left side categories*/}
                <aside className='w-1/6 bg-gray-800 text-white p-4'>
                    {/* Todo: Categories */}
                    <Categories />
                </aside>
                {/* products */}
                <main className='w-4/6 p-4'>
                    <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
                        {children}
                    </div>
                </main>
                {/* right side sorting */}
                <aside className='w-1/6 bg-gray-800 text-white p-4'>
                    {/* Todo: Sorting options */}
                    <SortingOptions />
                </aside>
            </div>
        </div>
    )
}

export default ShopLayout