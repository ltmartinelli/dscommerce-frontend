import { useEffect, useState } from 'react';
import { unstable_HistoryRouter as HistoryRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute/index.tsx';
import { AccessTokenPayloadDTO } from './models/auth.ts';
import AdminHome from './routes/Admin/AdminHome/index.tsx';
import ProductForm from './routes/Admin/ProductForm/index.tsx';
import ProductListing from './routes/Admin/ProductListing/index.tsx';
import Admin from './routes/Admin/index.tsx';
import ClientHome from './routes/ClientHome';
import Cart from './routes/ClientHome/Cart';
import Catalog from './routes/ClientHome/Catalog';
import Confirmation from './routes/ClientHome/Confirmation/index.tsx';
import Login from './routes/ClientHome/Login';
import ProductDetails from './routes/ClientHome/ProductDetails';
import * as authService from './services/auth-service.ts';
import * as cartService from './services/cart-service.ts';
import { ContextCartCount } from './utils/context-cart';
import { ContextToken } from './utils/context-token.ts';
import { history } from './utils/history';

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
              <Route index element={<Navigate to="/admin/home" />} />
              <Route path="home" element={<AdminHome />} />
              <Route path="products" element={<ProductListing />} />
              <Route path="products/:productId" element={<ProductForm />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />

          </Routes>
        </HistoryRouter>
      </ContextCartCount.Provider>
    </ContextToken.Provider>
  );
}
