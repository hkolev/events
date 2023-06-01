import { createContext, useState } from 'react';
import { useQuery } from 'react-query';
import { getEvents } from '../../api/events';
import { IEvent } from '../../types/Event';
import { EventType } from '../../components/Event/Event';

export type HomeContextType = {
  events: EventType[];
  isLoading: boolean;
  updateSearchTerm(term: string): void;
};

export const HomeContext = createContext<HomeContextType | null>(null);

type GetEventProividerType = {
  children: React.ReactNode;
};

export const HomeContextProvider = ({ children }: GetEventProividerType) => {
  const [search, setSearch] = useState<string>();

  const { data, isLoading } = useQuery(['events', search], () =>
    getEvents(search)
  );

  const updateSearchTerm = (term: string) => {
    setSearch(term);
  };

  const mapServerEventsToState = (events: IEvent[]): EventType[] => {
    return events?.map(
      ({ id, title, performers, datetime_utc, venue, stats }) => {
        return {
          id,
          title,
          image: performers[0].image,
          date: String(datetime_utc),
          location: venue.name,
          price: stats.average_price,
        };
      }
    );
  };

  return (
    <HomeContext.Provider
      value={{
        events: mapServerEventsToState(data?.events),
        isLoading,
        updateSearchTerm,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
