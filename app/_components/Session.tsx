"use client"
import { useSession } from 'next-auth/react'
import React from 'react'

const Session = () => {

    const data = useSession();

    console.log(data)

  return (
    <div>Session</div>
  )
}

export default Session