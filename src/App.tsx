import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Nav from "./components/nav";
import Profile from "./pages/proifle";
import Playlists from "./pages/playlists";
import CreatePlaylist from "./pages/createplaylist";
import Login from "./pages/login";

function App() {
  return (
    <div className="App h-screen">
      <header>
        <Nav />
      </header>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<CreatePlaylist />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
