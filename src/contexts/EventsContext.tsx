import { createContext, useState } from 'react';
import { EventType } from '../components/Event/Event';

export type EventsType = {
  events: EventType[];
  addEvent(event: EventType): void;
};

export const EventsContext = createContext<EventsType | null>(null);

type EventsProividerType = {
  children: React.ReactNode;
};

export const EventsProvider = ({ children }: EventsProividerType) => {
  const [events, setEvents] = useState<EventType[]>([]);

  const addEvent = (event: EventType) => {
    setEvents((prev) => [...prev, event]);
  };

  return (
    <EventsContext.Provider
      value={{
        events,
        addEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
