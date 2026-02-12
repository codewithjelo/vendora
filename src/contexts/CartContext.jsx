"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  const addToCart = (product, quantity = 1, color = "Original") => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.color === color
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity, color }];
    });
  };

  const removeFromCart = (productId, color) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === productId && item.color === color))
    );
  };

  const updateQuantity = (productId, color, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, color);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId && item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const placeOrder = () => {
    if (cartItems.length === 0) return;

    const order = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: [...cartItems],
      total: cartTotal,
      status: "Confirmed",
    };

    setOrderHistory((prev) => [order, ...prev]);
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        orderHistory,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        placeOrder,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};