import { useContext } from 'react';
import { EventsList } from '../../components/EventsList';
import { EventsContext, EventsType } from '../../contexts/EventsContext';
import { CreateEventForm } from '../../components/CreateEventForm';
import { CreateEventFormValues } from '../../components/CreateEventForm/CreateEventForm';

export const CreateEvent = () => {
  const { events, addEvent } = useContext(EventsContext) as EventsType;

  const handleSubmit = (data: CreateEventFormValues) => {
    addEvent({
      id: Date.now(),
      date: data.calendar,
      title: data.name,
      image: data.image,
      price: Number(data.price),
      location: data.location,
      userCreated: true,
    });
  };

  return (
    <div>
      <CreateEventForm onSubmit={handleSubmit} />

      <EventsList
        events={events}
        emptyText="You currently don't own any events!"
      />
    </div>
  );
};
