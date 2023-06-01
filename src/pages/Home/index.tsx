import { HomeContextProvider } from './HomeContext';
import { HomePage } from './HomePage';

export const Home = () => {
  return (
    <HomeContextProvider>
      <HomePage />
    </HomeContextProvider>
  );
};
