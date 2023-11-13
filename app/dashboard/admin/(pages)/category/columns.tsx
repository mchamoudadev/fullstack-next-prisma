"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table"
import { useRouter } from "next/navigation";

import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { AlertDialogBox } from "./_components/AlertDaillog";

export type Category = {
  id: string
  name: number
  createdAt: string
}

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
   

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },

  },
  {
    accessorKey: "created",
    header: () => <div className="text-right">Created At</div>,
    cell: ({ row }) => {
      const formattedDate = new Date(row.getValue("created")).toDateString()
      return <div className="text-right font-medium">{formattedDate}</div>
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const categoryInfo = row.original

     const router = useRouter();

      return (
        <div className="space-x-2">
          <Button variant={"outline"} onClick={()=>router.push(`/dashboard/admin/category/${categoryInfo.id}`)}>Update</Button>
          <AlertDialogBox id={categoryInfo.id}/>
        </div>
    )
    }
  }
]