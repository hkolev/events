import { createContext, useEffect, useState } from 'react';
import { CartType } from '../types/Cart';

export type GlobalContextType = {
  cart: CartType[];
  totalPrice: number;
  addToCart?(id: number, name: string, price: number, qty: number): void;
  removeFromCart?(id: number): void;
};

export const GlobalContext = createContext<GlobalContextType | null>(null);

type GlobalProviderType = {
  children: React.ReactNode;
};

export const GlobalProvider = ({ children }: GlobalProviderType) => {
  const [cart, setCart] = useState<CartType[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;

    cart.forEach((el) => {
      total += el.qty * el.price;
    });

    setTotalPrice(total);
  }, [cart]);

  const addToCart = (id: number, name: string, price: number, qty: number) => {
    const isInCart = cart.find((el) => el.id === id);

    if (isInCart) {
      const newCart = cart.map((el) => {
        if (el.id === id) {
          return {
            id: el.id,
            name: el.name,
            price: el.price,
            qty,
          };
        } else {
          return el;
        }
      });

      setCart(newCart);

      return;
    }

    setCart((prev) => [
      ...prev,
      {
        name,
        price,
        id,
        qty,
      },
    ]);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((el) => el.id !== id));
  };

  return (
    <GlobalContext.Provider
      value={{
        cart,
        totalPrice,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
