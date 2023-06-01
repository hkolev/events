import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { GetEventContext } from '../GetEventContext';
import { EventPage } from '../EventPage';
import { WishlistContext } from '../../../contexts/WishlistContext';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { faker } from '@faker-js/faker';

const mockData = {
  isLoading: false,
  eventId: '1231212',
  data: {
    id: 12312,
    date: '5/23/2023, 12:00:00 AM',
    image: faker.image.urlPlaceholder(),
    location: faker.location.city(),
    price: 10,
    title: faker.lorem.paragraph(),
  },
};

describe('EventPage', () => {
  it('should render page with data', () => {
    render(
      <GlobalContext.Provider
        value={{
          addToCart: jest.fn(),
          cart: [],
          totalPrice: 0,
          removeFromCart: jest.fn(),
        }}
      >
        <WishlistContext.Provider
          value={{
            wishList: [],
            addToWishList: jest.fn(),
          }}
        >
          <GetEventContext.Provider value={mockData}>
            <EventPage />
          </GetEventContext.Provider>
        </WishlistContext.Provider>
      </GlobalContext.Provider>
    );

    const image = screen.getByAltText('main image') as HTMLImageElement;

    const title = screen.getByRole('heading', {
      name: mockData.data.title,
    });

    const time = screen.getByRole('heading', {
      name: /Time/i,
    });

    const date = screen.getByRole('heading', {
      name: /May 23/i,
    });

    const price = screen.getByRole('heading', {
      name: /10/i,
    });

    expect(title).toBeInTheDocument();
    expect(time).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(image.src).toContain(mockData.data.image);
  });

  it('should render page with data', () => {
    const mockDataWithNoPrice = {
      isLoading: false,
      eventId: '1231212',
      data: {
        id: 12312,
        date: '5/23/2023, 12:00:00 AM',
        image: faker.image.urlPlaceholder(),
        location: faker.location.city(),
        price: null,
        title: faker.lorem.paragraph(),
      },
    };

    render(
      <GlobalContext.Provider
        value={{
          addToCart: jest.fn(),
          cart: [],
          totalPrice: 0,
          removeFromCart: jest.fn(),
        }}
      >
        <WishlistContext.Provider
          value={{
            wishList: [],
            addToWishList: jest.fn(),
          }}
        >
          <GetEventContext.Provider value={mockDataWithNoPrice}>
            <EventPage />
          </GetEventContext.Provider>
        </WishlistContext.Provider>
      </GlobalContext.Provider>
    );

    const price = screen.getByRole('heading', {
      name: 'Currently there is no price',
    });

    const priceButton = screen.getByRole('button', {
      name: 'Add to cart',
    });

    expect(price).toBeInTheDocument();
    expect(priceButton).toBeDisabled();
  });

  it('should render preloader', () => {
    const mockDataWithPreloader = {
      isLoading: true,
      eventId: '1231212',
      data: {
        id: 12312,
        date: '5/23/2023, 12:00:00 AM',
        image: faker.image.urlPlaceholder(),
        location: faker.location.city(),
        price: null,
        title: faker.lorem.paragraph(),
      },
    };

    render(
      <GlobalContext.Provider
        value={{
          addToCart: jest.fn(),
          cart: [],
          totalPrice: 0,
          removeFromCart: jest.fn(),
        }}
      >
        <WishlistContext.Provider
          value={{
            wishList: [],
            addToWishList: jest.fn(),
          }}
        >
          <GetEventContext.Provider value={mockDataWithPreloader}>
            <EventPage />
          </GetEventContext.Provider>
        </WishlistContext.Provider>
      </GlobalContext.Provider>
    );

    const price = screen.getByRole('progressbar');

    expect(price).toBeInTheDocument();
  });
});
