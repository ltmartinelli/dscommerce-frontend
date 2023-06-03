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
import { history } from './utils/history';
import { PrivateRoute } from './components/PrivateRoute/index.tsx';
import { AccessTokenPayloadDTO } from './models/auth.ts';
import * as authService from './services/auth-service.ts'
import { ContextToken } from './utils/context-token.ts';
import Confirmation from './routes/ClientHome/Confirmation/index.tsx';

export default function App()
{

  const [contextCartCount, setContextCartCount] = useState<number>(0);

  const [contextTokenPayload, setContextTokenPayload] = useState<AccessTokenPayloadDTO>();


  useEffect(() =>
  {
    if (authService.isAuthenticated())
    {
      const payload = authService.getAccessTokenPayload();
      setContextTokenPayload(payload);
    }
  }, []);

  useEffect(() =>
  {
    const cart = cartService.getCart();
    setContextCartCount(cart.items.length);
  }, [])

  return (
    <ContextToken.Provider value={{ contextTokenPayload, setContextTokenPayload }}>
      <ContextCartCount.Provider value={{ contextCartCount, setContextCartCount }}>
        <HistoryRouter history={history}>
          <Routes>

            <Route path="/" element={<ClientHome />}>
              <Route index element={<Catalog />} />
              <Route path="catalog" element={<Catalog />} />
              <Route path="product-details/:productId" element={<ProductDetails />} />
              <Route path="cart" element={<Cart />} />
              <Route path="login" element={<Login />} />
              <Route path="confirmation/:orderId" element={<PrivateRoute><Confirmation /></PrivateRoute>} />
            </Route>

            <Route path="/admin/" element={<PrivateRoute roles={['ROLE_ADMIN']}><Admin /></PrivateRoute>}>
              <Route index element={<AdminHome />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />

          </Routes>
        </HistoryRouter>
      </ContextCartCount.Provider>
    </ContextToken.Provider>
  );
}
