import { createContext, useState } from 'react';
import { EventType } from '../components/Event/Event';

export type WishlistType = {
  wishList: EventType[];
  addToWishList(event: EventType): void;
};

export const WishlistContext = createContext<WishlistType | null>(null);

type WishlistProividerType = {
  children: React.ReactNode;
};

export const WishlistProivider = ({ children }: WishlistProividerType) => {
  const [wishList, setWishList] = useState<EventType[]>([]);

  const addToWishList = (event: EventType) => {
    const isInList = wishList.find((el) => el.id === event.id);
    if (isInList) {
      setWishList(wishList.filter((el) => event.id !== el.id));

      return;
    }

    setWishList((prev) => [...prev, event]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishList,
        addToWishList,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
