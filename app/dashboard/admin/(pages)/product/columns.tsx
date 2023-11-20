"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table"
import { useRouter } from "next/navigation";

import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { AlertDialogBox } from "../../_component/AlertDaillog";

export type Product = {
  id: string
  name: number
  price: number
  description: string
  stockQuantity: number
  createdAt: string
}

export const columns: ColumnDef<Product>[] = [
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
    accessorKey: "stockQuantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          stock Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const productInfo = row.original

      const router = useRouter();

      return (
        <div className="space-x-2">
          <Button variant={"outline"} onClick={() => router.push(`/dashboard/admin/product/${productInfo.id}`)}>Update</Button>
          <AlertDialogBox id={productInfo.id} schema="product" />
        </div>
      )
    }
  }
]