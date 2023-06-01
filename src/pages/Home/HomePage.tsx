import { useContext } from 'react';
import { EventsList } from '../../components/EventsList';
import { TextField } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { EventsContext, EventsType } from '../../contexts/EventsContext';
import { Link } from 'react-router-dom';
import { HomeContext, HomeContextType } from './HomeContext';

export const HomePage = () => {
  const { events: ownEvents } = useContext(EventsContext) as EventsType;
  const { events, isLoading, updateSearchTerm } = useContext(
    HomeContext
  ) as HomeContextType;

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchTerm(ev.target.value);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Box
          marginBottom={5}
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <Typography alignItems="center" variant="h3" gutterBottom>
            Search by team, artist, event or venue
          </Typography>

          <TextField
            id="outlined-basic"
            label="Search for events"
            variant="outlined"
            onChange={handleChange}
            fullWidth
          />
        </Box>

        <Box display="flex" justifyContent="center" alignItems="center">
          {isLoading ? (
            <CircularProgress />
          ) : (
            <EventsList
              events={events}
              emptyText="No matches for the current search"
            />
          )}
        </Box>

        <Typography marginBottom={5} variant="h3" gutterBottom>
          Events you own
        </Typography>
        {!ownEvents.length ? (
          <Typography variant="body1" gutterBottom>
            You currently don't own any events! Add one from{' '}
            <Link
              to="/create"
              style={{
                color: '#1976d2',
              }}
            >
              here
            </Link>
          </Typography>
        ) : (
          <EventsList events={ownEvents} />
        )}
      </Container>
    </>
  );
};
