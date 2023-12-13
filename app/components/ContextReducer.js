"use client"
import React, { createContext, useReducer, useContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext(); 

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: action.id, name: action.name,img:action.img,price:action.price,qty:action.qty,size:action.size }]; // Yeh assumption hai ki action.payload mein naya item hoga
    
      return state;

      case "REMOVE":
        let newArr = [...state]
        newArr.splice(action.index, 1)
        return newArr;
        case "DROP":
          let empArray = []
          return empArray
      case "UPDATE":
          let arr = [...state]
          arr.find((food, index) => {
              if (food.id === action.id) {
                  console.log(food.qty, parseInt(action.qty), action.price + food.price)
                  arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
              }
              return arr
          })
          return arr
      default:console.log("Error in Reducer");





  }
};

export const CartProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={cartDispatch}>
      <CartStateContext.Provider value={cartState}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartStateContext);
  if (!context) {
    throw new Error('useCart ko CartProvider ke andar use karna zaroori hai');
  }
  return context;
};

export const useCartDispatch = () => {
  const context = useContext(CartDispatchContext);
  if (!context) {
    throw new Error('useCartDispatch ko CartProvider ke andar use karna zaroori hai');
  }
  return context;
};
