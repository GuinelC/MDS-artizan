import React from 'react';
import { BiTrash } from 'react-icons/bi';
import { useCart } from '../../context/cartContext';

function CartList() {
  const { state: { items, total }, removeFromCart } = useCart();

  if (items.length < 1) {
    return (
      <h2>Votre panier est vide</h2>
    );
  }

  return (
    <>
      <h1>Cart</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>Nom du produit</th>
            <th>Description du produit</th>
            <th>Prix unitaire</th>
            <th>Quantité</th>
            <th>Prix total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(cartItem => (
            <tr key={cartItem.item.id}>
              <td>{cartItem.item.attributes.name}</td>
              <td>{cartItem.item.attributes.description}</td>
              <td>{cartItem.item.attributes.price || '10'}€</td>
              <td>{cartItem.qty}</td>
              <td>{(cartItem.qty * (cartItem.item.attributes.price || 10)).toFixed(2)} €</td>
              <td>
                <button onClick={() => removeFromCart(cartItem.item.id)}>
                  <BiTrash size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>{total}</td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}

export default CartList;
