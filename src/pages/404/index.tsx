import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

export const NoMatch = () => {
  return (
    <Box
      marginBottom={5}
      display="flex"
      alignItems="center"
      flexDirection="column"
    >
      <Typography alignItems="center" variant="h3" gutterBottom>
        This page doesn't exist
      </Typography>

      <Typography alignItems="center" variant="h5" color="#1976d2" gutterBottom>
        <Link to="/">Go to the home page</Link>
      </Typography>
    </Box>
  );
};
