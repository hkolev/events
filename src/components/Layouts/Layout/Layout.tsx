import { Outlet } from 'react-router-dom';
import { Header } from '../../Header';
import { Stack, Container } from '@mui/material';

export const Layout = () => {
  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <Stack
          sx={{
            marginTop: '50px',
          }}
        >
          <Outlet />
        </Stack>
      </Container>
    </>
  );
};
