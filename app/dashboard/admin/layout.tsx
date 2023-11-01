import React from 'react'
import AdminSidebar from './_component/AdminSidebar'
import Navbar from './_component/Navbar'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-full'>

            <div className='h-[70px] md:pl-56 fixed inset-y-0 w-full z-50'>
                <Navbar/>
            </div>

            <div className='hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50'>
                <AdminSidebar />
            </div>

            <main className='md:pl-56 h-full'>
                {children}
            </main>


        </div>
    )
}

export default AdminLayout