import { useEffect, useState } from "react";
import { ReturnedPlaylist } from "../types/playlist.type";
import PlaylistTile from "../components/playlisttile";
import { useUser } from "../services/user";

export default function Playlists() {
  const [playlists, setPlaylists] = useState<ReturnedPlaylist[]>([]);
  const image = "https://picsum.photos/50";
  const { user, isReady } = useUser();
  const [page, setPage] = useState<number>(1);
  const [maxPages, setMaxPages ] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
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
    const searchString = encodeURIComponent(searchQuery);
    const response = await fetch(
      process.env.REACT_APP_BACKEND_API_BASE_API +
        "playlists" +
        (page ? `?page=${page}` : "") +
        (searchQuery ? `?search=${encodeURIComponent(searchString)}` : ""),
      options
    );
    let playlistsJson = await response.json();

    setPlaylists(playlistsJson.results);
  };

  useEffect(() => {
    // Gather the playlists if they have not been gathered already
    if (!isReady()) return;
    fetchPlaylists();
  }, [user]);

  return (
    <div className="p-4 ">
      <div className="grid w-screen items-center justify-center">
        <div className="mb-6 mx-2 flex items-center px-4 py-3 rounded-md border-2 border-red-600 overflow-hidden max-w-md font-[sans-serif]">
          <input
            type="text"
            placeholder="Search playlists..."
            className="lg:w-96 sm:w-56 outline-none bg-transparent text-gray-100 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 192.904 192.904"
            width="16px"
            className="fill-gray-300 cursor-pointer"
            onClick={fetchPlaylists}
          >
            <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
          </svg>
        </div>
      </div>
      {playlists.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
          {playlists.map((playlist) => (
            <PlaylistTile
              Playlist={playlist}
              Name={playlist.playlist_name}
              Id={playlist.playlist_id}
              Image={image}
              key={playlist.playlist_id}
            />
          ))}
        </div>
      ) : (
        <p>No playlists found</p>
      )}
    </div>
  );
}
