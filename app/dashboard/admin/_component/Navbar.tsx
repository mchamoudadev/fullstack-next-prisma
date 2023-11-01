import React from 'react'
import MobileMenu from './MobileMenu'

const Navbar = () => {
  return (
    <div className='justify-center p-4 border-b h-full items-center bg-white shadow-sm'>
        <MobileMenu />
    </div>
  )
}

export default Navbar