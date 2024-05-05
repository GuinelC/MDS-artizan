import React from "react";
import { BiTrash, BiPlus, BiMinus } from "react-icons/bi";
import { useCart } from "../../context/cartContext";
import "./shop.css";

function CartList() {
  const {
    state: { items, total },
    removeFromCart,
    addToCart,
    adjustQuantity, // Assurez-vous que adjustQuantity est importé depuis useCart
  } = useCart();

  if (items.length < 1) {
    return <h2>Votre panier est vide</h2>;
  }

  const handleDecrement = (itemId) => {
    // Décrémente simplement la quantité de l'article dans le panier
    adjustQuantity(itemId);
  };

  return (
    <>
      <div className="tabContainer mx-auto">
        <table className="shopTab" border={1}>
          <thead>
            <tr>
              <th>Nom du produit</th>
              <th>Description du produit</th>
              <th>Prix unitaire</th>
              <th>Quantité</th>
              <th>Prix total</th>
              <th><BiTrash size={20} /></th>
            </tr>
          </thead>
          <tbody>
            {items.map((cartItem) => (
              <tr key={cartItem.item.id}>
                <td className="product-name">{cartItem.item.attributes.name}</td>
                <td className="descr">{cartItem.item.attributes.description}</td>
                <td className="product-price">{cartItem.item.attributes.price || "10"}€</td>
                <td>
                    <div className="quantity">
                        {cartItem.qty}
                        <div className="quantity-btn-box">
                            <button className="handleDecrement" onClick={() => handleDecrement(cartItem.item.id)}>
                                <BiMinus size={20} />
                            </button>
                            <button className="addToCart" onClick={() => addToCart(cartItem.item)}>
                                <BiPlus size={20} />
                            </button>
                        </div>
                    </div>
                </td>
                <td className="product-total">
                  {(
                    cartItem.qty * (cartItem.item.attributes.price || 10)
                  ).toFixed(2)}{" "}
                  €
                </td>
                <td>
                  <button className="removeFromCart" onClick={() => removeFromCart(cartItem.item.id)}>
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="TotalCard">
          <h3>TOTAL</h3>
          <hr />
          <p>{total}€</p>
          <button className="shop-submit">PAIEMENT</button>
        </div>
      </div>
    </>
  );
}

export default CartList;
