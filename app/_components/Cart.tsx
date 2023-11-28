"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useShoppingCart } from '@/hooks/useCart'
import React from 'react'
import PaymentDialog from './PaymentDialog'

const Cart = () => {

    const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useShoppingCart()


    return (
        <div className='bg-white'>
            <main>
                <div>
                    <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>

                    <div className="mt-12">
                        <section aria-labelledby="cart-heading">
                            <h2 id="cart-heading" className="sr-only">
                                Items in your shopping cart
                            </h2>

                            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                                {cartItems && cartItems.length > 0 && cartItems.map((product) => (
                                    <li key={product.id} className="flex py-6">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={product.thumbnailUrl!}
                                                alt={product.name}
                                                className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
                                            />
                                        </div>
                                        <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                                            <div>
                                                <div className="flex justify-between">
                                                    <h4 className="text-sm">
                                                        <span className="font-medium text-gray-700 hover:text-gray-800">
                                                            {product.name}
                                                        </span>
                                                    </h4>
                                                    <p className="ml-4 text-sm font-medium text-gray-900">${product.price}</p>
                                                </div>v
                                            </div>

                                            <div className="flex">
                                                <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                                            </div>
                                            <div className="mt-4 flex items-center justify-between">
                                                <label htmlFor={`quantity-${product.id}`} className="sr-only">
                                                    Quantity, {product.name}
                                                </label>

                                                <Input
                                                    min={0}
                                                    onChange={(e) => updateQuantity(product.id, parseInt(e.target.value))}
                                                    className='w-full flex-1' type='number' value={product.quantity} />

                                                <button
                                                    type="button"
                                                    className="ml-4 flex-1 text-sm font-medium text-main-600 hover:text-main-500 sm:ml-0 sm:mt-3"
                                                    onClick={() => removeFromCart(product.id)}
                                                >
                                                    <span>Remove</span>
                                                </button>
                                            </div>
                                        </div>
                                    </li>

                                ))}
                            </ul>
                        </section>

                        {/* Order summary */}
                        <section aria-labelledby="summary-heading" className="mt-10">
                            <h2 id="summary-heading" className="sr-only">
                                Order summary
                            </h2>

                            <div>
                                <dl className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-base font-medium text-gray-900">Subtotal</dt>
                                        <dd className="ml-4 text-base font-medium text-gray-900">${getTotalPrice()}</dd>
                                    </div>
                                </dl>
                                <p className="mt-1 text-sm text-gray-500">Shipping and taxes will be calculated at checkout.</p>
                            </div>

                            <div className="mt-10">
                                {/* <button
                                    type="submit"
                                    className="w-full rounded-md border border-transparent bg-main-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-main-700 focus:outline-none focus:ring-2 focus:ring-main-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                >
                                    Checkout
                                </button> */}
                                <PaymentDialog />
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Cart