import { useState } from "react"
import { useCartContext } from "../lib/hooks"

export default function Cart() {
  const { myCart } = useCartContext()
  const [actualCart, setActualCart] = useState(() => {
    return myCart.map((cartItem) => {
      return {
        priceId: cartItem.defaultPriceId,
        quantity: 1,
      }
    })
  })

  const handleAddQuantity = (chosenPriceId: string) => {
    const updatedCart = actualCart.map((cartItem) => {
      if (cartItem.priceId === chosenPriceId) {
        cartItem.quantity++

        return cartItem
      }

      return cartItem
    })

    setActualCart(updatedCart)
  }
  const handleSubtractQuantity = (chosenPriceId: string) => {
    const updatedCart = actualCart.map((cartItem) => {
      if (cartItem.priceId === chosenPriceId && cartItem.quantity !== 1) {
        cartItem.quantity--

        return cartItem
      }

      return cartItem
    })

    setActualCart(updatedCart)
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
          </tr>
        </thead>

        <tbody>
          {myCart.map((cartItem) => (
            <tr key={cartItem.id}>
              <th scope="row">
                <img className="h-[100px]" src={cartItem.images[0]} />
                <p>{cartItem.name}</p>
              </th>
              <td>{cartItem.defaultPrice.unitAmountDecimal / 100}</td>
              <td>
                <button
                  onClick={() =>
                    handleSubtractQuantity(cartItem.defaultPriceId)
                  }
                >
                  -
                </button>
                <p>
                  {
                    actualCart.find(
                      (item) => item.priceId === cartItem.defaultPriceId
                    )!.quantity
                  }
                </p>
                <button
                  onClick={() => handleAddQuantity(cartItem.defaultPriceId)}
                >
                  +
                </button>
              </td>
              <td>
                {(cartItem.defaultPrice.unitAmountDecimal / 100) *
                  actualCart.find(
                    (item) => item.priceId === cartItem.defaultPriceId
                  )!.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
