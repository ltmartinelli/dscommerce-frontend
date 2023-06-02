import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Catalog from './routes/ClientHome/Catalog';
import ProductDetails from './routes/ClientHome/ProductDetails';
import ClientHome from './routes/ClientHome';
import Cart from './routes/ClientHome/Cart';
import { useEffect, useState } from 'react';
import { ContextCartCount, ContextCartCountType } from './utils/context-cart';
import Login from './routes/ClientHome/Login';
import * as cartService from './services/cart-service.ts'
import Admin from './routes/Admin/index.tsx';
import AdminHome from './routes/Admin/AdminHome/index.tsx';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import {history} from './utils/history';


export default function App()
{

  const [contextCartCount, setContextCartCount] = useState<number>(0);


  useEffect(() =>
  {
    const cart = cartService.getCart();
    setContextCartCount(cart.items.length);
  }, [])

  return (
    <ContextCartCount.Provider value={{ contextCartCount, setContextCartCount }}>
      <HistoryRouter history={history}>
        <Routes>

          <Route path="/" element={<ClientHome />}>
            <Route index element={<Catalog />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="product-details/:productId" element={<ProductDetails />} />
            <Route path="cart" element={<Cart />} />
            <Route path="login" element={<Login />} />
          </Route>

          <Route path="/admin/" element={<Admin />}>
            <Route index element={<AdminHome/>}/>
          </Route>

          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </HistoryRouter>
    </ContextCartCount.Provider>
  );
}
