import CartList from "../components/shop/CartList"
import { FaCartArrowDown } from "react-icons/fa";
import "./cart.css";


function Cart () {
  return (
    <>
      <div className="card-contain">
        <div className="Cart-header">
          <FaCartArrowDown />
          <h1>Panier</h1>
        </div>
        <CartList />
      </div>
    </>
  )
}

export default Cart
