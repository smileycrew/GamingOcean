import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import Register from "./pages/register"
import Marketing from "./pages/marketing"
import AuthContextProvider from "./contexts/auth-context-provider"
import Header from "./components/header"
import Footer from "./components/footer"
import AuthorizedRoute from "./routes/authorized-route"
import { useEffect, useState } from "react"
import Cart from "./pages/cart"
import { ProductsSchema, productsSchema } from "./lib/validations"
import CartContextProvider from "./contexts/cart-context-provider"

function App() {
  const [products, setProducts] = useState<ProductsSchema | null>(null)
  console.log("🚀 ~ App ~ products:", products)

  const handleGetProducts = async () => {
    const response = await fetch("/api/stripe/GetAllProducts")
    const products = await response.json()

    const validatedData = productsSchema.safeParse(products)

    if (!validatedData.success) {
      // TODO FIND A WAY TO HANDLE THE ERROR
      console.log("could not get data")
    } else {
      setProducts(validatedData.data)
    }
  }
  const handleBuyProduct = async (priceId: string) => {
    const response = await fetch("/api/stripe/pay", {
      body: JSON.stringify(priceId),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        mode: "cors",
      },
      method: "POST",
    })
    const data = await response.json()

    window.location.href = data.url
  }

  useEffect(() => {
    handleGetProducts()
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col items-center min-h-screen">
              <Header />
              <AuthContextProvider>
                <CartContextProvider>
                  <AuthorizedRoute>
                    <main className="flex flex-1 justify-center w-full">
                      <Outlet />
                    </main>
                  </AuthorizedRoute>
                </CartContextProvider>
              </AuthContextProvider>
              <Footer />
            </div>
          }
        >
          <Route
            index
            element={
              <Marketing
                products={products}
                handleBuyProduct={handleBuyProduct}
              />
            }
          />
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
