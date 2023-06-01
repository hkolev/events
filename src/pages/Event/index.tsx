import { GetEventProvider } from './GetEventContext';
import { EventPage } from './EventPage';

export const Event = () => {
  return (
    <>
      <GetEventProvider>
        <EventPage />
      </GetEventProvider>
    </>
  );
};
