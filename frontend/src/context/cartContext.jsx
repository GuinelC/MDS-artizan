import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const actionTypes = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  SET_TOTAL: 'SET_TOTAL', // Ajouter une action pour mettre à jour le total du panier
  RESET: 'RESET'
};

const initialState = {
  items: JSON.parse(localStorage.getItem('cart')) || [],
  total: 0
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return {
        ...state,
        // On vérifie si le panier contient déjà l'item
        items: state.items.some(cartItem => cartItem.item.id === action.data.item.id)
          // Il est déjà dans le panier : On boucle sur les items pour trouver celui déjà présent
          ? state.items.map(cartItem => {
            if (cartItem.item.id === action.data.item.id) {
              // On augmente sa quantité de 1
              return { ...cartItem, qty: cartItem.qty + 1 }
            }
            return cartItem
          })
          // Il n'est pas dans le panier : On ajoute l'item dans le tableau
          : state.items.concat([{ item: action.data.item, qty: 1 }]) // => item = plat
      }
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(cartItem => action.data.id !== cartItem.item.id)
      };
    case actionTypes.SET_TOTAL:
      return {
        ...state,
        total: action.total
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};


const cartFactory = dispatch => ({
  addToCart: (item, qty = 1) => { // Ajout d'un paramètre 'qty' avec une valeur par défaut de 1
    dispatch({
      type: actionTypes.ADD_TO_CART,
      data: { item, qty } // Passer la quantité avec l'article
    });
  },
  removeFromCart: id => {
    dispatch({
      type: actionTypes.REMOVE_FROM_CART,
      data: { id }
    });
  }
});


const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  useEffect(() => {
    const total = state.items.reduce((acc, curr) => acc + curr.item.attributes.price * curr.qty, 0);
    dispatch({ type: actionTypes.SET_TOTAL, total }); // Dispatch l'action pour mettre à jour le total du panier
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, ...cartFactory(dispatch) }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside a CartProvider');
  return context;
};

export { CartProvider, useCart };
