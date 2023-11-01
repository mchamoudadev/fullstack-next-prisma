"use client";

import { CarrotIcon, ShoppingCart, User2Icon } from 'lucide-react';
import React from 'react'
import SidebarItem from './SidebarItem';

const routes = [
    {
        id: 1,
        icon: CarrotIcon,
        label: 'Products',
        href: '/products'
    },
    {
        id: 2,
        icon: CarrotIcon,
        label: 'Categories',
        href: '/categories'
    },
    {
        id: 3,
        icon: User2Icon,
        label: 'Users',
        href: '/users'
    },
    {
        id: 4,
        icon: ShoppingCart,
        label: 'Orders',
        href: '/orders'
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