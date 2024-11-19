import { useEffect, useState } from "react";
import { Video } from "../types/youtubesearch.type";
import { CreatedPlaylist } from "../types/playlist.type";
import PlaylistTile from "../components/playlisttile";
import { Playlist } from "../types/playlist.type";

export default function Playlists() {
  const [playlists, setPlaylists] = useState<CreatedPlaylist[]>([]);
  const image = "https://picsum.photos/50";
  const fetchPlaylists = async () => {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_API_BASE_API + "playlists"
    );
    let playlistsJson = await response.json();

    setPlaylists(playlistsJson);
  };

  useEffect(() => {
    // Gather the playlists if they have not been gathered already
    if (playlists.length < 1) {
      fetchPlaylists();
    }
  }, []);

  if (playlists.length > 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xxl:grid-cols-10 gap-6 p-6">
        {playlists.map((playlist) => {
          return (
            <PlaylistTile
              Playlist={playlist}
              Name={playlist.name}
              Id={playlist.id}
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
