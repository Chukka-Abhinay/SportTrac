import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router";
import { Provider, useSelector } from "react-redux";
import store from "./redux/features/store.js";
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import HomePage from "./pages/HomePage.jsx"; // New component that holds NavBar, Hero, Dashboard etc.
import PrivateRoute from "./components/PrivateRoute.jsx";
import Profile from "./pages/User/Profile.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile></Profile>}></Route>
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
