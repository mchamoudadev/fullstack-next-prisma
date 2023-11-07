"use client";

import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

interface SidebarItemProps {
    id : number;
    icon: LucideIcon,
    label : string;
    href: string;
}

const SidebarItem = ({id, icon : Icon, label, href} : SidebarItemProps) => {

    const pathName = usePathname();
    const router = useRouter()

    const isActive = pathName.includes(href)

  return (
    <button 
    onClick={()=>router.push(`/dashboard/admin/${href}`)}
    type='button' className={cn("flex items-center gap-x-2 text-slate-500 font-[500] pl-6 transition-all group hover:bg-main-50 hover:text-main-600", isActive && 'text-main-600 bg-main-50')}>
        <div className='flex items-center gap-x-2 py-4'>
            <Icon size={22} className={cn('text-slate-500 group-hover:text-main-600',isActive && 'text-main-600')}/>
            {label}
        </div>
        <div className={cn('opacity-0 border-2 border-main-700 h-full transition-all ml-auto', isActive && 'opacity-1')}/>
    </button>
  )
}

export default SidebarItem