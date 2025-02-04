import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App.jsx';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { CartScreen, HomeScreen, ProductScreen, LoginScreen, RegisterScreen, ShippingScreen, PaymentScreen,PlaceOrderScreen } from './screens/index.js';
import { Provider } from 'react-redux';
import store from './store.js';
import PrivateRouter from './components/PrivateRouter.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/products/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />

      <Route path='' element={<PrivateRouter />}>
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} />
      </Route>

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
