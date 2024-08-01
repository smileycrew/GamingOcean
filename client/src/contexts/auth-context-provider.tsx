import { createContext, useEffect, useState } from "react"
import { getUser } from "../managers/auth-manager"
import { UserSchema } from "../lib/validations"
type TAuthContext = {
  user: UserSchema
}

export const AuthContext = createContext<TAuthContext | null>(null)

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState({
    id: 0,
    email: "",
    firstName: "",
    identityUser: null,
    identityUserId: "",
    lastName: "",
    roles: [],
    userName: "",
  })

  const handleGetUser = async () => {
    const response = await getUser()
    console.log("🚀 ~ handleGetUser ~ response:", response)

    setUser(response)
  }

  useEffect(() => {
    handleGetUser()
  }, [])
  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
