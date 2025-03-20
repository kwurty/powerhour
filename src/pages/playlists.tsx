import { useEffect, useState } from "react";
import { ReturnedPlaylist } from "../types/playlist.type";
import PlaylistTile from "../components/playlisttile";
import { useUser } from "../services/user";

export default function Playlists() {
  const [playlists, setPlaylists] = useState<ReturnedPlaylist[]>([]);
  const image = "https://picsum.photos/50";
  const { user, isReady } = useUser();
  const fetchPlaylists = async () => {
    let options = {};
    if (user && user.id) {
      const token = localStorage.getItem("token");
      options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }
    const response = await fetch(
      process.env.REACT_APP_BACKEND_API_BASE_API + "playlists",
      options
    );
    let playlistsJson = await response.json();

    setPlaylists(playlistsJson);
  };

  useEffect(() => {
    // Gather the playlists if they have not been gathered already
    if (!isReady()) return;
    fetchPlaylists();
  }, [user]);

  if (playlists.length > 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xxl:grid-cols-10 gap-6 p-6">
        {playlists.map((playlist) => {
          return (
            <PlaylistTile
              Playlist={playlist}
              Name={playlist.playlist_name}
              Id={playlist.playlist_id}
              Image={image}
            />
          );
        })}
      </div>
    );
  } else {
    return <>Loading...</>;
  }
}
