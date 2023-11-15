import { z } from 'zod'

export const productSchema = z.object({
    name: z.string().min(1, "name must be at least one character").max(255, "name should not be more than 255 characters"),
    categoryId: z.string().min(1, "name is required.").max(255),
    thumbnail: z.string().min(1, "name is required.").max(255).optional(),
    gallery: z.array(z.string()).optional(),
    price: z.number(),
    description: z.string().min(1, "name is required.").max(500).optional(),
    stockQuantity: z.number()
})
