import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  let [user, setUser] = useState(null);

  useEffect(() => {}, []);
  return (
    <nav>
      <ul>
        <li>
          <Link to="/playlists">Playlists</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/create">Create Playist</Link>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}
