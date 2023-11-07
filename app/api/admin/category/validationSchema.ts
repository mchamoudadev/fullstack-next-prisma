import { z } from 'zod'

export const categorySchema = z.object({
    name: z.string().min(1, "name must be at least one character").max(255, "name should not be more than 255 characters"),
})
