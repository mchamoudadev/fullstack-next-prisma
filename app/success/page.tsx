"use client"
import { useShoppingCart } from '@/hooks/useCart'
import { CheckCircle } from 'lucide-react'
import React, { useEffect } from 'react'

const SuccessPage = () => {

    const { clearCart } = useShoppingCart();

    useEffect(() => {
        clearCart();
    }
        , [])

    return (
        <div className='h-screen flex items-center justify-center'>
            <div className='flex flex-col text-center items-center justify-center py-10'>
                <div className='rounded-full'>
                    <CheckCircle className='w-20 h-20 text-green-600' />
                </div>
                <h1 className='text-center text-lg font-bold'>Payment Success</h1>
            </div>

        </div>
    )
}

export default SuccessPage