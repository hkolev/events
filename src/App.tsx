import { Routes, Route } from 'react-router-dom';
import { NoMatch } from './pages/404';
import { Home } from './pages/Home';
import { GlobalProvider } from './contexts/GlobalContext';
import { Event } from './pages/Event';
import { CreateEvent } from './pages/CreateEvent';
import { WishlistProivider } from './contexts/WishlistContext';
import { pageRoutes } from './types/Routes';
import { Layout } from './components/Layouts/Layout';
import { Wishlist } from './pages/Wishlist';
import { EventsProvider } from './contexts/EventsContext';
import { Cart } from './pages/Cart';

export default function App() {
  return (
    <GlobalProvider>
      <WishlistProivider>
        <EventsProvider>
          <Routes>
            <Route path="*" element={<NoMatch />} />

            <Route path={pageRoutes.index} element={<Layout />}>
              <Route index element={<Home />} />
              <Route path={pageRoutes.create} element={<CreateEvent />} />
              <Route path={pageRoutes.event} element={<Event />} />
              <Route path={pageRoutes.wishlist} element={<Wishlist />} />
              <Route path={pageRoutes.cart} element={<Cart />} />
            </Route>
          </Routes>
        </EventsProvider>
      </WishlistProivider>
    </GlobalProvider>
  );
}
