import './App.css';
import { MantineProvider } from '@mantine/core';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import theme from './utils/theme';
import Home from './pages/Home';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <div className="App">
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/*' element={<Home />} />
        </Routes>
      </div>
    </MantineProvider>
  );
}

export default App;
