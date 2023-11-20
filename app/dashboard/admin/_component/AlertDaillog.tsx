import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { API } from "@/lib/config"
import axios from "axios"
import toast from "react-hot-toast"

import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from "react"
import { Loader2 } from "lucide-react"

export const AlertDialogBox = ({ id, schema }: { id: string, schema: string }) => {
    const queryClient = useQueryClient();

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true)
        try {
            await axios.delete(`${API}/admin/${schema}/${id}`);
            queryClient.invalidateQueries({ queryKey: [schema] })
            toast.success("Successfully deleted");
            // router.push('/dashboard/admin/category')
            setLoading(false)
        } catch (err) {
            setLoading(false)
            toast.error("something went wrong please try again")
        }
    }


    return (
        <AlertDialog>
            <AlertDialogTrigger>

                {loading ? <Button variant={"destructive"} className='flex justify-center items-center space-x-2 gap-x-1'>
                    Delete
                    <Loader2 className='animate-spin h-3 w-3 text-white mx-2' />
                </Button> :
                    <Button variant={"destructive"}
                    >Delete</Button>
                }


            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                    >Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}