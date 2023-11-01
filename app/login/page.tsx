import { Metadata, NextPage } from 'next'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '../../components/ui/button'

export const metadata: Metadata = {
    title: "Login page",
    description: "login page description"
}

const LoginPage = () => {
    return (
        <div className='w-[350px] mx-auto flex justify-center items-center h-screen'>
            <Card>
                <CardHeader>
                    <CardTitle>Login with Google</CardTitle>
                    <CardDescription>Login by using your google account</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="outline" className='w-full space-x-2'>
                        <FcGoogle className="w-5 h-5"/>
                        <span>
                            Continue With Google
                        </span>
                    </Button>

                </CardContent>

            </Card>

        </div>
    )
}

export default LoginPage
