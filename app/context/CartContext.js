"use client";
import { createContext } from "react";

// The single CartContext provider lives in app/ClientLayout.jsx.
export const CartContext = createContext({
  cart: {}, subTotal: 0, addToCart: () => {}, removeFromCart: () => {}, clearCart: () => {}, productsReady: false,
});
