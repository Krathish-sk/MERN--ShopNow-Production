import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import App from "./App";
import "./assets/styles/index.css";
import "./assets/styles/bootstrap.custom.css";
import store from "./store";
import {
  CartScreen,
  HomeScreen,
  LoginScreen,
  OrderScreen,
  Paymentscreen,
  PlaceOrderScreen,
  ProductScreen,
  ProfileScreen,
  RegisterScreen,
  ShippingScreen,
} from "./screens";
import {
  OrderListScreen,
  ProductEditScreen,
  UserEditScreen,
  UserListScreen,
} from "./screens/admin";
import { AdminRoute, PrivateRoute } from "./components";
import ProductListScreen from "./screens/admin/ProductListScreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/search/:keyword" element={<HomeScreen />} />
      <Route path="/page/:pageNumber" element={<HomeScreen />} />
      <Route
        path="/search/:keyword/page/:pageNumber"
        element={<HomeScreen />}
      />
      <Route path="/products/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      {/* Registered Users */}
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<Paymentscreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="order/:id" element={<OrderScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>

      {/* Admin Users */}
      <Route path="/" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListScreen />} />{" "}
        <Route
          path="/admin/productlist/:pageNumber"
          element={<ProductListScreen />}
        />
        <Route path="/admin/productlist" element={<ProductListScreen />} />
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
        <Route path="/admin/userlist" element={<UserListScreen />} />
        <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
