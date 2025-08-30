// src/context/Cart/CartProvider.jsx
import { useState, useEffect } from "react";
import CartContext from "./CartContext";

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Load cart & favorites from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedFavorites = localStorage.getItem("favorites");

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  // Save cart & favorites to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Cart functions
  const addToCart = (product, color = "default") => {
    const existingItemIndex = cart.findIndex(
      (item) => item.id === product.id && item.color === color
    );

    if (existingItemIndex >= 0) {
      // Update quantity if product already exists
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // Add new item to cart
      setCart((prev) => [
        ...prev,
        {
          ...product,
          quantity: 1,
          color,
        },
      ]);
    }
  };

  const removeFromCart = (id, color = "default") => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.color === color))
    );
  };

  const updateQuantity = (id, color, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id, color);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.color === color
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  // Favorites functions
  const toggleFavorite = (product) => {
    const isFavorite = favorites.some((item) => item.id === product.id);

    if (isFavorite) {
      setFavorites((prev) => prev.filter((item) => item.id !== product.id));
    } else {
      setFavorites((prev) => [...prev, product]);
    }
  };

  const isFavorite = (id) => {
    return favorites.some((item) => item.id === id);
  };
  const isCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        isCart,
        favorites,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
