import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './contexts/auth';
import RouteWrapper from './routes'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RouteWrapper />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
