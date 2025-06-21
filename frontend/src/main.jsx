import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router";
import { Provider, useSelector } from "react-redux";
import store from "./redux/features/store.js";
import Register from "./components/Account/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import HomePage from "./pages/HomePage.jsx"; // New component that holds NavBar, Hero, Dashboard etc.
import UserPage from "./pages/UserPage.jsx"; // New component for username route

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/:username" element={<UserPage />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
