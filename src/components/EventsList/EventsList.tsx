import { Event } from '../Event';
import { EventType } from '../Event/Event';
import './eventsList.scss';

export const EventsList = ({
  events,
  emptyText = 'No content!',
}: {
  events: EventType[];
  emptyText?: string;
}) => {
  if (!events || !events.length) {
    return <h2>{emptyText}</h2>;
  }
  return (
    <div className="events" role="list">
      {events.map((el: EventType) => {
        return (
          <Event
            key={el.id}
            id={Number(el.id)}
            title={el.title}
            image={el.image}
            date={String(el.date)}
            location={el.location}
            price={el.price}
            userCreated={!!el.userCreated}
          />
        );
      })}
    </div>
  );
};
