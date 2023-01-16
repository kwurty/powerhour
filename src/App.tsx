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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RouterContainer />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<CreatePlaylist />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/login" element={<Login />} />
      </Route>
    )
  );

  return (
    <div className="App h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
