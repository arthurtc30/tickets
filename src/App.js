import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './contexts/auth';
import Rotas from './routes'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Rotas />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
