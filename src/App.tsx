import React from "react";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Errorscreen from "./pages/errorscreen";
import Profile from "./pages/profile";
import Playlists from "./pages/playlists";
import CreatePlaylist from "./pages/createplaylist";
import Login from "./pages/login";
import Play from "./pages/play";
import RouterContainer from "./pages/routercontainer";
import { UserProvider } from "./services/user";
import HomePage from "./pages/homepage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RouterContainer />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/profile/:id/edit" element={<Profile />} />
        <Route path="/create" element={<CreatePlaylist isEdit={false} />} />
        <Route path="/edit/:id" element={<CreatePlaylist isEdit={true} />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/login" element={<Login />} />
        <Route path="/playlists/:id" element={<Play />} />
        <Route path="*" element={<Errorscreen />} />
      </Route>
    )
  );

  return (
    <UserProvider>
      <div className="App bg-gray-900" style={{}}>
        <RouterProvider router={router} />
      </div>
    </UserProvider>
  );
}

export default App;
