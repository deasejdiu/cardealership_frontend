import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.css";
// import { SearchProvider } from "./SearchContext"; // Import SearchProvider
// import SearchContext from "./SearchContext";
import  {SearchProvider}  from "./SearchContext"; // 
import App from "./App";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import HomePage from "./pages/HomePage";
import CarDetails from "./pages/CarDetails";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import UserEditPage from "./pages/UserEditPage";
import UsersListPage from "./pages/UsersListPage";
import CarsListPage from "./pages/CarsListPage";
import AddCarPage from "./pages/AddCarPage";
import CarEditPage from "./pages/CarEditPage";
import OrdersPage from "./pages/OrdersPage";
import OrderEditPage from "./pages/OrderEditPage";
import MyOrders from "./pages/MyOrders";
import ContactListPage from "./pages/ContactListPage";
import ViewMessage from "./pages/ViewMessage";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import PrivateRoute from "./Components/PrivateRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" index={true} element={<HomePage />} />
          <Route path="/car/:id" element={<CarDetails />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/SignUpPage" element={<SignUpPage />} />

          <Route path='' element={<PrivateRoute />}>
            <Route path="/users-list" element={<UsersListPage />} />
            <Route path="/:id/edit" element={<UserEditPage />} />
            <Route path="/cars-list" element={<CarsListPage />} />
            <Route path="/add-car" element={<AddCarPage />} />
            <Route path="/:id/edit/car" element={<CarEditPage />} />
            <Route path="/all/orders" element={<OrdersPage />} />
            <Route path="/:id/order/edit" element={<OrderEditPage />} />
            <Route path="/my-deals" element={<MyOrders />} />
            <Route path="/contact" element={<ContactListPage />} />
            <Route path="/:id/message" element={<ViewMessage />} />
          </Route>
         
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <I18nextProvider i18n={i18n}>
        <SearchProvider> {/* Use SearchProvider */}
          <RouterProvider router={router} />
        </SearchProvider>
      </I18nextProvider>
    </ChakraProvider>
  </React.StrictMode>
);

reportWebVitals();
