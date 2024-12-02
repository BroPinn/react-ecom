import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const ProductsContext = createContext();

// Create a provider component
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products'); // Fake Store API
        if (!response.ok) throw new Error('Failed to fetch data');

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Log the products after they've been updated (useEffect with dependency)
  useEffect(() => {
    if (!loading && products.length > 0) {
      console.log('Products fetched:', products);
    }
  }, [products, loading]);

  // Return the context provider with products, loading, and error states
  return (
    <ProductsContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductsContext.Provider>
  );
};
