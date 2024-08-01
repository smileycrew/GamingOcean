import { z } from "zod"

export const productSchema = z.object({
  id: z.string(),
  defaultPrice: z.object({ unitAmountDecimal: z.coerce.number().int() }),
  defaultPriceId: z.string(),
  description: z.string(),
  images: z.string().array(),
  name: z.string(),
})

export const productsSchema = z.array(productSchema)

export const rolesSchema = z.object({
  roles: z.any(),
})

export const userSchema = z.object({
  id: z.coerce.number().int().positive(),
  email: z.string().min(1).max(100),
  firstName: z.string().min(1).max(100),
  identityUser: z.null(),
  identityUserId: z.string().min(1),
  lastName: z.string().min(1).max(100),
  roles: z.array(rolesSchema),
  userName: z.string().min(1).max(100),
})

export type UserSchema = z.infer<typeof userSchema>
export type ProductSchema = z.infer<typeof productSchema>
export type ProductsSchema = z.infer<typeof productsSchema>
