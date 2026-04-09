"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext(null);
const STORAGE_KEY = "favoriteProductIds";

export const FavoritesProvider = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setFavoriteIds(JSON.parse(stored));
  }, []);

  // Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const toggleFavorite = (productId) => {
    setFavoriteIds((prev) =>
      prev.includes(productId)
       ? prev.filter((id) => id!== productId)
        : [...prev, productId]
    );
  };

  const isFavorite = (productId) => favoriteIds.includes(productId);

  return (
    <FavoritesContext.Provider
      value={{ favoriteIds, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error("useFavorites must be used within FavoritesProvider");
  return context;
};