"use client"
import { DataTable } from '@/components/ui/data-table'
import { API } from '@/lib/config'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { columns } from '../columns'

const List = () => {

    const { data, isError, isLoading } = useQuery({
        queryKey: ['category'],
        queryFn: () => axios.get(`${API}/admin/category`).then(res => res.data),
        staleTime: 60 * 1000,
        retry: 3
    })

    if(isLoading) {
         return <h1>Loading...</h1>
    }
    
    return (
        <div>
            <DataTable columns={columns} data={data}/>
        </div>
    )
}

export default List