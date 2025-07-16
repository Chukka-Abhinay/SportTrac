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
import AdminRoute from "./pages/Admin/AdminRoute.jsx";
import UserList from "./pages/Admin/UserList.jsx";
import SportList from "./pages/Admin/SportList.jsx";
import TeamList from "./pages/Admin/TeamList.jsx";
import TeamInfo from "./pages/Admin/TeamInfo.jsx";
import TeamUpdate from "./pages/Admin/TeamUpdate.jsx";
import CreateTeam from "./pages/Admin/CreateTeam.jsx";
import MatchList from "./pages/Admin/MatchList.jsx";
import CreateMatch from "./pages/Admin/CreateMatch.jsx";
import MatchUpdate from "./pages/Admin/MatchUpdate.jsx";
// import MatchUpdate from "./pages/Admin/matchUpdate.jsx";
import { SportProvider } from "./Context/SportContext.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile></Profile>}></Route>
      </Route>
      {/* //Admin router */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="userlist" element={<UserList />}></Route>
        <Route path="sportlist" element={<SportList />} />
        <Route path="teamlist" element={<TeamList></TeamList>}></Route>
        <Route path="teams" element={<CreateTeam />}></Route>
        <Route path="teams/:id" element={<TeamInfo />}></Route>
        <Route path="teams/update/:id" element={<TeamUpdate />}></Route>
        <Route path="matchlist" element={<MatchList />}></Route>
        <Route path="matches" element={<CreateMatch />}></Route>
        <Route path="matches/:id" element={<MatchUpdate />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <SportProvider>
      <RouterProvider router={router} />
    </SportProvider>
  </Provider>
);
