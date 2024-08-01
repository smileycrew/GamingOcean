import { Navigate } from "react-router-dom"
import { useAuthContext } from "../lib/hooks"

export default function AuthorizedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuthContext()
  if (user !== null) {
    return children
  } else if (user === null) {
    return <Navigate to="/login" />
  }
}
