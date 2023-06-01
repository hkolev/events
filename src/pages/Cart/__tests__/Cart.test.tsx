import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import { Cart } from '..';
import {
  GlobalContext,
  GlobalContextType,
} from '../../../contexts/GlobalContext';

const mockData: GlobalContextType = {
  cart: [
    {
      name: faker.lorem.paragraph(1),
      price: faker.number.int(),
      id: faker.number.int(),
      qty: faker.number.int(),
    },
    {
      name: faker.lorem.paragraph(1),
      price: faker.number.int(),
      id: faker.number.int(),
      qty: faker.number.int(),
    },
  ],
  totalPrice: faker.number.int(),
};

describe('EventsList', () => {
  it('should render with data', () => {
    render(
      <GlobalContext.Provider value={mockData}>
        <Cart />
      </GlobalContext.Provider>
    );

    const cartItems = screen.getAllByRole('listitem');
    const totalPrice = screen.getByRole('heading', {
      name: /Total Price/i,
    });

    expect(cartItems).toHaveLength(2);
    expect(totalPrice).toHaveTextContent(String(mockData.totalPrice));
  });

  it('should render message when no items in cart', () => {
    render(
      <GlobalContext.Provider
        value={{
          cart: [],
          totalPrice: 0,
        }}
      >
        <Cart />
      </GlobalContext.Provider>
    );

    const emptyCart = screen.getByRole('heading', {
      name: /No items in cart!/i,
    });

    const totalPrice = screen.getByRole('heading', {
      name: /Total Price/i,
    });

    expect(emptyCart).toBeInTheDocument();
    expect(totalPrice).toBeInTheDocument();
    expect(totalPrice).toHaveTextContent('0');
  });
});
