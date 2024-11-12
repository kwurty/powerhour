import React from "react";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Nav from "./components/nav";
import Profile from "./pages/proifle";
import Playlists from "./pages/playlists";
import CreatePlaylist from "./pages/createplaylist";
import Login from "./pages/login";
import RouterContainer from "./pages/routercontainer";
import { UserProvider } from "./services/user";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RouterContainer />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<CreatePlaylist isEdit={false} />} />
        <Route path="/edit/:id" element={<CreatePlaylist isEdit={true} />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/login" element={<Login />} />
      </Route>
    )
  );

  return (
    <UserProvider>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </UserProvider>
  );
}

export default App;
