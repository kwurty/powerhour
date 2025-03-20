import { Link } from "react-router-dom";
import { ReturnedPlaylist } from "../types/playlist.type";
import { toast } from "react-toastify";
import { useUser } from "../services/user";
import { useState } from "react";

interface props {
  Name: string;
  Id: number;
  Image: string;
  Playlist: ReturnedPlaylist;
}

export default function PlaylistTile({ Name, Id, Image, Playlist }: props) {
  const { user } = useUser();
  const [liked, setLiked] = useState<boolean>(
    Boolean(Playlist.user_liked) || false
  );
  const [bookmarked, setBookmarked] = useState<boolean>(
    Boolean(Playlist.user_bookmarked) || false
  );
  const togglePlaylistLike = async () => {
    if (!user) {
      toast.error("You must be logged in to like a playlist!");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      let response = await fetch(`http://localhost:3333/playlists/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: Id,
        }),
      });
      if (!response.ok) {
        toast.error("There was an error liking this playlist. Try again!");
        return;
      } else {
        const responseJson = await response.json();
        if (responseJson.status === "failure") {
          toast.error("There was an error with liking this playlist.");
        } else {
          toast.success(`${responseJson.status} ${Playlist.playlist_name}`);
          setLiked((liked) => !liked);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const togglePlaylistBookmark = async () => {
    if (!user) {
      toast.error("You must be logged in to bookmark a playlist!");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      let response = await fetch(`http://localhost:3333/playlists/bookmark`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: Id,
        }),
      });
      if (!response.ok) {
        toast.error("There was an error bookmarking this playlist. Try again!");
        return;
      } else {
        const responseJson = await response.json();
        if (responseJson.status === "failure") {
          toast.error("There was an error with liking this playlist.");
        } else {
          toast.success(`${responseJson.status} ${Playlist.playlist_name}`);
          setBookmarked((bookmarked) => !bookmarked);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Link
        to={`/playlists/${Id}`}
        state={{ Playlist: Playlist }}
        className="bg-white rounded-lg rounded-b-none shadow-md p-4 w-80 flex flex-col gap-3"
      >
        <div className="flex items-center gap-3">
          <img
            src="user-avatar.jpg"
            alt="User Avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="text-sm text-gray-500">{Playlist.user_name}</p>
            <p className="text-lg font-bold text-gray-800">{Name}</p>
          </div>
        </div>
      </Link>

      <div className="flex justify-between bg-slate-600 rounded-b-lg p-4 w-80">
        <div className="flex gap-2 text-sm text-gray-200">
          <button
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            title="Like"
            onClick={(e) => {
              togglePlaylistLike();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
              className={`hover:fill-cinnabar-400 ${
                user && liked ? "fill-cinnabar-400" : ""
              }`}
            >
              <path d="M360-240h220q17 0 31.5-8.5T632-272l84-196q2-5 3-10t1-10v-32q0-17-11.5-28.5T680-560H496l24-136q2-10-1-19t-10-16l-29-29-184 200q-8 8-12 18t-4 22v200q0 33 23.5 56.5T360-240ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>
          </button>
          <span className="align-text-bottom pt-1">
            Likes: {Playlist.like_count}
          </span>
        </div>
        <button
          className="rounded-lg flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          title="Bookmark"
          onClick={(e) => {
            togglePlaylistBookmark();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
            className={`hover:fill-orange-400 ${
              user && bookmarked ? "fill-orange-400" : ""
            }`}
          >
            <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
