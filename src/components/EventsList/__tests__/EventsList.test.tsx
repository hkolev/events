import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { EventsList } from '..';
import { BrowserRouter } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import { EventType } from '../../Event/Event';

const createEvent = (): EventType => {
  return {
    id: faker.number.int(),
    date: '5/23/2023, 12:00:00 AM',
    image: faker.image.urlPlaceholder(),
    location: faker.location.city(),
    price: faker.number.int(10),
    title: faker.lorem.paragraph(),
  };
};

const generateFakeData = (numUsers = 5, cb: () => EventType): EventType[] => {
  return Array.from({ length: numUsers }, cb);
};

describe('EventsList', () => {
  it('should render component correctly', () => {
    render(
      <BrowserRouter>
        <EventsList events={generateFakeData(5, createEvent)} />
      </BrowserRouter>
    );
    const element = screen.getByRole('list');

    expect(element).toBeInTheDocument();
  });

  it('should render component with data', () => {
    render(
      <BrowserRouter>
        <EventsList events={generateFakeData(5, createEvent)} />
      </BrowserRouter>
    );

    const elements = screen.getAllByRole('listitem');

    expect(elements).toHaveLength(5);
  });

  describe('emptyText prop', () => {
    it('should render component with custom text when no data is present', () => {
      render(
        <BrowserRouter>
          <EventsList events={[]} emptyText="Test demo text" />
        </BrowserRouter>
      );

      const elements = screen.getByText('Test demo text');

      expect(elements).toBeInTheDocument();
    });

    it('should render component with default text when no data is present', () => {
      render(
        <BrowserRouter>
          <EventsList events={[]} />
        </BrowserRouter>
      );

      const elements = screen.getByText('No content!');

      expect(elements).toBeInTheDocument();
    });
  });
});
