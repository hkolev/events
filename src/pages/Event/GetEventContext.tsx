import { createContext, useContext } from 'react';
import { useQuery } from 'react-query';
import { Navigate, useLocation } from 'react-router-dom';
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

  const isOwnEvent = ownEvents.find((el) => el.id === Number(state.id));

  const { data, isLoading } = useQuery(
    ['event', state.id],
    () => getEvent(state.id),
    {
      enabled: !state.userCreated,
    }
  );

  const remapedDataForPage = {
    id: !state.userCreated ? data?.id : isOwnEvent?.id,
    image: !state.userCreated ? data?.performers[0]?.image : isOwnEvent?.image,
    title: !state.userCreated ? data?.title : isOwnEvent?.title,
    price: !state.userCreated ? data?.stats?.average_price : isOwnEvent?.price,
    date: !state.userCreated ? data?.datetime_utc : isOwnEvent?.date,
    location: !state.userCreated ? data?.venue?.name : isOwnEvent?.location,
  };

  return !ownEvents.length ? (
    <Navigate to="/" replace />
  ) : (
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
