import MenuPage from './pages/MenuPage';
import { UserProgressContextProvider } from './context/UserProgressContext';
import Layout from './components/Layout';
import { CartContextProvider } from './context/CartContext';
import FloatingCartButton from './components/FloatingCartButton';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import OrderSuccessPage from './pages/OrderSuccessPage';

function App() {

  
 

  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        
      <Routes>
      <Route path="/" element={<MenuPage />} />
      <Route path="/table/:tableId" element={<Layout />}>
        <Route index element={<MenuPage />} />
      </Route>
      <Route path="/order-success" element={<OrderSuccessPage />} />
    </Routes>
        
        <FloatingCartButton />
        <ToastContainer />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;