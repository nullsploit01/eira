import './App.css';
import RoutesConfig from './lib/routes';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router';

const App = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <RoutesConfig />
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
