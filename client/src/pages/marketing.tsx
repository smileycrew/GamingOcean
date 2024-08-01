import { useCartContext } from "../lib/hooks"
import { ProductsSchema } from "../lib/validations"

type MarketingProps = {
  handleBuyProduct: (priceId: string) => void
  products: ProductsSchema | null
}

export default function Marketing({
  handleBuyProduct,
  products,
}: MarketingProps) {
  const { handleCartChanges } = useCartContext()
  return (
    <div>
      <ul>
        {products !== null &&
          products.map((product) => (
            <li className="border" key={product.id}>
              <img className="h-[250px] object-cover" src={product.images[0]} />
              <p>{product.name}</p>
              <p>{product.description}</p>
              <p>{product.defaultPrice.unitAmountDecimal / 100}</p>

              <button
                className="border"
                onClick={() => handleBuyProduct(product.defaultPriceId)}
              >
                Pre order
              </button>
              <button
                className="border"
                onClick={() => handleCartChanges(product)}
              >
                Add to cart
              </button>
            </li>
          ))}
      </ul>
    </div>
  )
}
