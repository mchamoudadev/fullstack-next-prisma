"use client";

import { CarrotIcon, ShoppingCart, User2Icon } from 'lucide-react';
import React from 'react'
import SidebarItem from './SidebarItem';

const routes = [
    {
        id: 1,
        icon: CarrotIcon,
        label: 'Product',
        href: '/product'
    },
    {
        id: 2,
        icon: CarrotIcon,
        label: 'Category',
        href: '/category'
    },
    {
        id: 3,
        icon: User2Icon,
        label: 'User',
        href: '/user'
    },
    {
        id: 4,
        icon: ShoppingCart,
        label: 'Order',
        href: '/order'
    }
]



const SidebarRoutes = () => {
    return (
        <div className='flex flex-col w-full'>
            {
                routes.map((route, index) => (
                    <SidebarItem
                        key={route.id}
                        id={route.id}
                        icon={route.icon}
                        href={route.href}
                        label={route.label}
                    />
                ))
            }
        </div>
    )
}

export default SidebarRoutes