import { useContext } from "react"
import { AuthContext } from "../contexts/auth-context-provider"
import { CartContext } from "../contexts/cart-context-provider"

export function useCartContext() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error("useCartContext must be within a CartContextProvider")
  }

  return context
}

export function useAuthContext() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuthContext must be within a AuthContextProvider")
  }

  return context
}
