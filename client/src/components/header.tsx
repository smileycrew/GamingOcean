import { Link, useLocation } from "react-router-dom"

const routes = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Shop",
    path: "/shop",
  },
  {
    label: "Youtube",
    path: "https://www.youtube.com/@gamingoceantcg",
  },
  {
    label: "Cart",
    path: "/cart",
  },
]

export default function Header() {
  const currentLocation = useLocation()

  return (
    <header className="flex flex-col w-full">
      {currentLocation.pathname !== "/cart" && (
        <img className="h-[350px] object-cover w-full" src="/gamingOcean.png" />
      )}
      <nav className="bg-primary flex h-[50px] items-center justify-center text-white">
        <ul className="flex gap-10">
          {routes.map((route) => (
            <li key={route.path}>
              <Link to={route.path}>{route.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
