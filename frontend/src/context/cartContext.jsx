import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './authContext'; // Import du contexte d'authentification

const initialState = {
  items: JSON.parse(localStorage.getItem('cart')) || [],
  total: 0
};
const CartContext = createContext();

const actionTypes = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  SET_TOTAL: 'SET_TOTAL',
  ADJUST_QUANTITY: 'ADJUST_QUANTITY', // Ajout du type pour ajuster la quantité
  RESET: 'RESET'
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return {
        ...state,
        items: state.items.some(cartItem => cartItem.item.id === action.data.item.id)
          ? state.items.map(cartItem => {
            if (cartItem.item.id === action.data.item.id) {
              return { ...cartItem, qty: cartItem.qty + 1 }
            }
            return cartItem
          })
          : state.items.concat([{ item: action.data.item, qty: 1 }])
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
    case actionTypes.ADJUST_QUANTITY:
      return {
        ...state,
        items: state.items.map(cartItem => {
          if (cartItem.item.id === action.data.id) {
            const newQty = cartItem.qty - 1;
            if (newQty === 0) {
              // Si la nouvelle quantité est égale à zéro, supprimez l'article du panier
              return null;
            } else {
              // Sinon, mettez à jour la quantité
              return { ...cartItem, qty: newQty };
            }
          }
          return cartItem;
        }).filter(item => item !== null) // Supprimez les articles avec une quantité de zéro du panier
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const cartFactory = (dispatch) => ({
  addToCart: (item, qty = 1) => {
    dispatch({
      type: actionTypes.ADD_TO_CART,
      data: { item, qty },
    });
  },
  removeFromCart: (id) => {
    dispatch({
      type: actionTypes.REMOVE_FROM_CART,
      data: { id },
    });
  },
  adjustQuantity: (id, qty) => {
    if (qty <= 0) {
      dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        data: { id },
      });
    } else {
      dispatch({
        type: actionTypes.ADJUST_QUANTITY,
        data: { id, qty },
      });
    }
  },
});

const CartProvider = ({ children }) => {
  const { state: authState } = useAuth(); // Accès à l'état d'authentification
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    if (authState.isLoggedIn) {
      localStorage.setItem('cart', JSON.stringify(state.items));
    }
  }, [state.items, authState.isLoggedIn]);

  useEffect(() => {
    if (!authState.isLoggedIn) {
      localStorage.removeItem('cart'); // Supprimer le panier du local storage lorsque l'utilisateur se déconnecte
    }
  }, [authState.isLoggedIn]);

  useEffect(() => {
    if (authState.isLoggedIn) {
      const total = state.items.reduce((acc, curr) => acc + curr.item.attributes.price * curr.qty, 0);
      dispatch({ type: actionTypes.SET_TOTAL, total });
    }
  }, [state.items, authState.isLoggedIn]);

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
