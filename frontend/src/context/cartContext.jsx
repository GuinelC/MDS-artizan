// Import des modules nécessaires
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Création du contexte du panier
const CartContext = createContext();

// Définition des types d'actions
const actionTypes = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  SET_TOTAL: 'SET_TOTAL',
  ADJUST_QUANTITY: 'ADJUST_QUANTITY', // Ajout du type pour ajuster la quantité
  RESET: 'RESET'
};

// État initial du panier
const initialState = {
  items: JSON.parse(localStorage.getItem('cart')) || [],
  total: 0
};

// Reducer du panier
const cartReducer = (state, action) => {
  switch (action.type) {
    // Action pour ajouter un article au panier
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
    // Action pour supprimer un article du panier
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(cartItem => action.data.id !== cartItem.item.id)
      };
    // Action pour mettre à jour le total du panier
    case actionTypes.SET_TOTAL:
      return {
        ...state,
        total: action.total
      };
    // Action pour ajuster la quantité d'un article dans le panier
    case actionTypes.ADJUST_QUANTITY:
      return {
        ...state,
        items: state.items.map(cartItem => {
          if (cartItem.item.id === action.data.id) {
            const newQty = cartItem.qty - 1 >= 0 ? cartItem.qty - 1 : cartItem.qty;
            return { ...cartItem, qty: newQty };
          }
          return cartItem;
        }).filter(item => item.qty > 0) // Supprimez les articles avec une quantité de zéro du panier
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// Fonctions pour créer des actions de panier
const cartFactory = (dispatch) => ({
  // Action pour ajouter un article au panier
  addToCart: (item, qty = 1) => {
    dispatch({
      type: actionTypes.ADD_TO_CART,
      data: { item, qty },
    });
  },
  // Action pour supprimer un article du panier
  removeFromCart: (id) => {
    dispatch({
      type: actionTypes.REMOVE_FROM_CART,
      data: { id },
    });
  },
  // Action pour ajuster la quantité d'un article dans le panier
  adjustQuantity: (id, qty) => {
    dispatch({
      type: actionTypes.ADJUST_QUANTITY,
      data: { id, qty },
    });
  },
});

// Provider du panier
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Effet pour mettre à jour le panier dans le localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  // Effet pour calculer et mettre à jour le total du panier
  useEffect(() => {
    const total = state.items.reduce((acc, curr) => acc + curr.item.attributes.price * curr.qty, 0);
    dispatch({ type: actionTypes.SET_TOTAL, total });
  }, [state.items]);

  // Rendu du Provider avec le contexte et les actions du panier
  return (
    <CartContext.Provider value={{ state, ...cartFactory(dispatch) }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook pour utiliser le panier dans les composants
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside a CartProvider');
  return context;
};

// Export des éléments nécessaires
export { CartProvider, useCart };
