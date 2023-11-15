"use client"
import { DataTable } from '@/components/ui/data-table'
import { API } from '@/lib/config'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { columns } from '../columns'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const List = () => {

    const { data, isError, isLoading } = useQuery({
        queryKey: ['category'],
        queryFn: () => axios.get(`${API}/admin/category`).then(res => res.data),
        staleTime: 60 * 1000,
        retry: 3
    })

    const router = useRouter()

    if(isLoading) {
         return <h1>Loading...</h1>
    }
    
    return (
        <div className='my-4 space-y-4 sm:p-6 lg:p-2'>
            <div className='flex justify-end'>
                <Button variant={'outline'}
                onClick={()=> router.push('/dashboard/admin/product/new')}
                >
                    Create New Product
                </Button>
            </div>
            <DataTable columns={columns} data={data}/>
        </div>
    )
}

export default List