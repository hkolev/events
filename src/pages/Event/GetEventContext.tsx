import { createContext, useContext } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { getEvent } from '../../api/events';
import { EventsContext, EventsType } from '../../contexts/EventsContext';
import { EventType } from '../../components/Event/Event';

export type GetEventType = {
  data: EventType;
  isLoading: boolean;
  eventId: string;
};

export const GetEventContext = createContext<GetEventType | null>(null);

type GetEventProividerType = {
  children: React.ReactNode;
};

export const GetEventProvider = ({ children }: GetEventProividerType) => {
  const { state } = useLocation();
  const { events: ownEvents } = useContext(EventsContext) as EventsType;

  const { data, isLoading } = useQuery(
    ['event', state.id],
    () => getEvent(state.id),
    {
      enabled: !state.userCreated,
    }
  );

  const findEvent = ownEvents.find((el) => el.id === Number(state.id));

  const remapedDataForPage = {
    id: !state.userCreated ? data?.id : findEvent?.id,
    image: !state.userCreated ? data?.performers[0]?.image : findEvent?.image,
    title: !state.userCreated ? data?.title : findEvent?.title,
    price: !state.userCreated ? data?.stats?.average_price : findEvent?.price,
    date: !state.userCreated ? data?.datetime_utc : findEvent?.date,
    location: !state.userCreated ? data?.venue?.name : findEvent?.location,
  };

  return (
    <GetEventContext.Provider
      value={{
        data: remapedDataForPage,
        isLoading,
        eventId: state.id,
      }}
    >
      {children}
    </GetEventContext.Provider>
  );
};
