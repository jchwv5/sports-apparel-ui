/* eslint-disable no-plusplus */
import React from 'react';

const CartContext = React.createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case 'delete': {
      return {
        ...state,
        products: state.products.filter((product) => product.title !== action.product.title)
      };
    }
    case 'add': {
      const itemInCart = state.products.find((product) => product.title === action.product.title);
      if (itemInCart) {
        itemInCart.quantity += 1;
        const productsCopy = JSON.parse(JSON.stringify(state.products));
        const productIndex = productsCopy.findIndex((product) => product.id === action.product.id);
        productsCopy.fill(itemInCart, productIndex, productIndex + 1);
        return {
          ...state,
          products: [
            ...productsCopy

          ]

        };
      }
      return {
        ...state,
        products: [...state.products, action.product]
      };
    } case 'decrease': {
      const itemInCart = state.products.find((product) => product.title === action.product.title);
      if (itemInCart) {
        itemInCart.quantity -= 1;
        const productsCopy = JSON.parse(JSON.stringify(state.products));
        const productIndex = productsCopy.findIndex((product) => product.id === action.product.id);
        productsCopy.fill(itemInCart, productIndex, productIndex + 1);
        return {
          ...state,
          products: [
            ...productsCopy

          ]

        };
      }
      return {
        ...state,
        products: [...state.products, action.product]
      };
    } case 'reset': {
      const itemInCart = state.products.find((product) => product.title === action.product.title);
      if (itemInCart) {
        itemInCart.quantity = 1;
        const productsCopy = JSON.parse(JSON.stringify(state.products));
        const productIndex = productsCopy.findIndex((product) => product.id === action.product.id);
        productsCopy.fill(itemInCart, productIndex, productIndex + 1);
        return {
          ...state,
          products: [
            ...productsCopy

          ]

        };
      }
      return {
        ...state,
        products: [...state.products, action.product]
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function CartProvider({ children }) {
  const initialProducts = {
    products: [],
    setProducts: () => { }
  };

  const [state, dispatch] = React.useReducer(cartReducer, initialProducts);

  const value = { state, dispatch };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = React.useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartDispatch must be used within a CartProvider');
  }
  return context;
}

export { CartProvider, useCart };
