import { useState } from "react"
import { loginUser, registerUser } from "../managers/auth-manager"

type AuthFormProps = {
  type: "login" | "register"
}

export default function AuthForm({ type }: AuthFormProps) {
  const [userData, setUserData] = useState(() => {
    if (type === "login") {
      return {
        email: "",
        password: "",
      }
    } else {
      return {
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        userName: "",
      }
    }
  })
  console.log("🚀 ~ const[userData,setUserData]=useState ~ userData:", userData)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = async () => {
    if (type === "login") {
      const user = await loginUser(userData)
      console.log("🚀 ~ handleSubmit ~ user:", user)
    } else if (type === "register") {
      const user = await registerUser(userData)
      console.log("🚀 ~ handleSubmit ~ user:", user)
    }
  }
  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault()

        handleSubmit()
      }}
    >
      <label htmlFor="email">Email</label>
      <input
        className="border"
        id="email"
        name="email"
        onChange={handleChange}
        type="email"
        value={userData.email}
      />

      {type === "register" && (
        <>
          <label htmlFor="firstName">First name</label>
          <input
            className="border"
            id="firstName"
            name="firstName"
            onChange={handleChange}
            value={userData.firstName}
          />

          <label htmlFor="lastName">Last name</label>
          <input
            className="border"
            id="lastName"
            name="lastName"
            onChange={handleChange}
            value={userData.lastName}
          />

          <label htmlFor="userName">Username</label>
          <input
            className="border"
            id="userName"
            name="userName"
            onChange={handleChange}
            value={userData.userName}
          />
        </>
      )}

      <label htmlFor="password">Password</label>
      <input
        className="border"
        id="password"
        name="password"
        onChange={handleChange}
        type="password"
        value={userData.password}
      />

      <button className="border">Submit</button>
    </form>
  )
}
