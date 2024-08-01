import { createContext, useState } from "react"
import { ProductSchema, ProductsSchema } from "../lib/validations"

type TCartContext = {
  handleCartChanges: (newCartItem: ProductSchema) => void
  myCart: ProductsSchema
}

export const CartContext = createContext<TCartContext | null>(null)

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [myCart, setMyCart] = useState<ProductsSchema | []>([])
  console.log("🚀 ~ myCart:", myCart)
  // price id and qty on a list
  const handleCartChanges = (newCartItem: ProductSchema) => {
    const isItemInCart = myCart.some(
      (cartItem) => cartItem.id === newCartItem.id
    )

    if (isItemInCart === false) {
      setMyCart([...myCart, newCartItem])
    } else {
      setMyCart(() => {
        const updatedCart = myCart.map((cartItem) => {
          if (cartItem.id === newCartItem.id) {
            return newCartItem
          }

          return cartItem
        })

        return updatedCart
      })
    }
  }
  // const handleEditCart = () => {}
  // const handleRemoveFromCart = () => {}
  return (
    <CartContext.Provider value={{ handleCartChanges, myCart }}>
      {children}
    </CartContext.Provider>
  )
}
