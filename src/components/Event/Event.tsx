import { Link } from 'react-router-dom';
import { pageLinks } from '../../types/Routes';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import './event.scss';

export type EventType = {
  id: number;
  title: string;
  date: string;
  location: string;
  price: number | null;
  image: string;
  userCreated?: boolean;
  addToWishlist?(event: EventType): void;
};

export const Event = ({
  id,
  title,
  date,
  price,
  location,
  image,
  userCreated,
}: EventType) => {
  const reformatTitle = `${title.trim().toLowerCase().split(' ').join('-')}`;

  const _date = new Date(date);
  const dayOfMonth = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
  }).format(_date);
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
    _date
  );

  return (
    <Link
      role="listitem"
      className="event"
      to={`${pageLinks.event}/${reformatTitle}/${id}`}
      state={{
        id,
        title,
        userCreated,
      }}
    >
      <div className="event__wrapper">
        <figure
          role="figure"
          className="event__image"
          style={{
            backgroundImage: `url("${image}")`,
          }}
        ></figure>

        <div className="event__body">
          <div className="event__date">
            <p>{dayOfMonth}</p>
            <p>{month}</p>
          </div>

          <div className="event__content">
            <h2 className="event__title">{title}</h2>
            <h3 className="event__price">
              {price ? <>{price}$</> : 'Currently there is no price'}
            </h3>
            <h5 className="event__place">
              <LocationOnIcon />
              {location}
            </h5>
          </div>
        </div>
      </div>
    </Link>
  );
};
