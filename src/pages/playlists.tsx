import { useEffect, useState } from "react";
import { Video } from "../types/youtubesearch.type";
import { Playlist } from "../types/playlist.type";

export default function Playlists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    // Gather the playlists if they have not been gathered already
    if (playlists.length < 1) {
      const fetchPlaylists = async () => {
        const fetchedPlaylists = await fetch(
          process.env.REACT_APP_BACKEND_API_BASE_API + "playlists"
        );
        console.log(fetchedPlaylists);
      };
      fetchPlaylists();
    }
  }, []);
  return <div>VIEW PLAYLISTS</div>;
}
