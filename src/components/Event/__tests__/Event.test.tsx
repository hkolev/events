import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import { Event } from '..';
import { BrowserRouter } from 'react-router-dom';

const mockData = {
  id: 12312,
  date: '5/23/2023, 12:00:00 AM',
  image: faker.image.urlPlaceholder(),
  location: faker.location.city(),
  price: 10,
  title: faker.lorem.paragraph(),
};

const dayOfMonth = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
}).format(new Date(mockData.date));

const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
  new Date(mockData.date)
);

describe('EventsList', () => {
  it('should render with data', () => {
    render(
      <BrowserRouter>
        <Event {...mockData} />
      </BrowserRouter>
    );

    const image = screen.getByRole('figure');

    const monthName = screen.getByText(month);
    const dayInTheMonth = screen.getByText(dayOfMonth);

    const title = screen.getByRole('heading', {
      name: RegExp(mockData.title, 'i'),
    });

    const price = screen.getByRole('heading', {
      name: RegExp(String(mockData.price), 'i'),
    });

    const eventPlace = screen.getByRole('heading', {
      name: RegExp(mockData.location, 'i'),
    });

    expect(eventPlace).toBeInTheDocument();
    expect(eventPlace).toHaveTextContent(mockData.location);

    expect(price).toBeInTheDocument();
    expect(price).toHaveTextContent(String(mockData.price));

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(mockData.title);

    expect(monthName).toBeInTheDocument();
    expect(monthName).toHaveTextContent(month);

    expect(dayInTheMonth).toBeInTheDocument();
    expect(dayInTheMonth).toHaveTextContent(dayOfMonth);

    expect(image).toHaveStyle(`
    background-image: url(${mockData.image});
    `);
  });

  it('should render with correct message when no price is selected', () => {
    render(
      <BrowserRouter>
        <Event {...mockData} price={null} />
      </BrowserRouter>
    );

    const price = screen.getByRole('heading', {
      name: 'Currently there is no price',
    });

    expect(price).toBeInTheDocument();
  });
});
