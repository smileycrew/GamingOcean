import { User, UserEssentials } from "../lib/types"
import { userSchema } from "../lib/validations"

const _apiUrl = "/api/auth"

export const getUser = async () => {
  const response = await fetch(`${_apiUrl}/me`)

  if (response.status !== 200) {
    return null
  }

  const user = await response.json()

  return user
}

export const loginUser = async (userData: UserEssentials) => {
  const response = await fetch(`${_apiUrl}/login`, {
    credentials: "same-origin",
    headers: {
      Authorization: `Basic ${btoa(`${userData.email}:${userData.password}`)}`,
    },
    method: "POST",
  })

  if (response.status !== 200) {
    return Promise.resolve(undefined)
  }

  const user = await getUser()

  const validatedUser = userSchema.safeParse(user)

  if (!validatedUser.success) {
    // TODO FIND A BETTER WAY
    console.log("something went wrong?")
  } else {
    return validatedUser.data
  }
}

export const registerUser = async (userData: User) => {
  userData.password = btoa(userData.password)

  const response = await fetch(`${_apiUrl}/register`, {
    body: JSON.stringify(userData),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  })

  if (response.status !== 200) {
    return Promise.resolve(null)
  }

  const user = await getUser()

  return user
}
