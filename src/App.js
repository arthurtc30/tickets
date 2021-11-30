import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './contexts/auth';
import RouteWrapper from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <ToastContainer autoClose={2000} />
        <RouteWrapper />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
