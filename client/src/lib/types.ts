export type CartItem = {
  priceId: string
  quantity: number
}

export type UserEssentials = {
  email: string
  password: string
}

export type User = UserEssentials & {
  firstName: string
  lastName: string
  userName: string
}
