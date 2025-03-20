import React, {
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  useEffect,
  ReactEventHandler,
} from "react";
import { Playlist } from "../types/playlist.type";
import { Video, YoutubeResponseVideo } from "../types/youtubesearch.type";
import PlaylistTrack from "./playlisttrack";
import { useUser } from "../services/user";
import { useNavigate } from "react-router-dom";
import {
  deleteLocalStorage,
  getLocalStorage,
  setLocalStorage,
} from "../services/tools";
import { toast } from "react-toastify";

interface Props {
  playlist: Playlist;
  setPlaylist: Dispatch<SetStateAction<Playlist>>;
  setPlaylistTracks: Dispatch<SetStateAction<Video[]>>;
  setPlaylistName: (name: string) => void;
  setPlayVideo: (video: YoutubeResponseVideo | Video) => void;
  isEdit: boolean;
}

export default function PlaylistView({
  playlist,
  setPlaylistTracks,
  setPlaylistName,
  setPlayVideo,
  setPlaylist,
  isEdit,
}: Props) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useUser();
  const navigate = useNavigate();

  // Toggle to input field when the div is clicked
  const handleDivClick = () => {
    setIsEditing(true);
  };

  const submitChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      submitChanges();
    }
  };

  // Handle updating the name in the state
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistName(event.target.value);
  };

  // Submit the changes when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setIsEditing(false);
      submitChanges();
    }
  };

  useEffect(() => {
    const updateName = setTimeout(() => {}, 500);
    return () => {
      clearTimeout(updateName);
    };
  }, [playlist.name]);

  // Hook to detect clicks outside the input
  useEffect(() => {
    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);

  // Simulate the fetch request to update the playlist name
  const submitChanges = async () => {
    // Make a check if this is an existing playlist or not - if new, don't submit adjustment post
  };

  const submitPlaylist = async () => {
    if (!user) {
      toast.error("You must be logged in to submit a playlist!");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      let response = await fetch(`http://localhost:3333/playlists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userid: user.id,
          name: playlist.name,
          videos: playlist.videos,
        }),
      });
      if (!response.ok) {
        toast.error("There was an error creating your playlist. Try again!");
        return;
      }
      const responseJson = await response.json();
      const playlistId = responseJson.id;
      deleteLocalStorage("newPlaylist");
      navigate(`/playlists/${playlistId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const shufflePlaylist = () => {
    if (!playlist || !Array.isArray(playlist.videos)) {
      throw new Error(
        "Invalid playlist object: Missing or invalid videos array."
      );
    }

    const shuffledVideos = [...playlist.videos]; // Clone the videos array to avoid mutating the original.

    console.log("shuffling", shuffledVideos);
    for (let i = shuffledVideos.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [shuffledVideos[i], shuffledVideos[randomIndex]] = [
        shuffledVideos[randomIndex],
        shuffledVideos[i],
      ];
    }

    // Return a new playlist object with the shuffled videos array.
    setPlaylistTracks(shuffledVideos);
  };

  return (
    <div className="text-white">
      <div className="flex w-100 justify-between px-4 bg-gray-900 mb-5">
        <div className="flex w-full justify-around">
          <div className="flex">
            <span className="text-red-600 pr-2"> Name: </span>
            {isEditing ? (
              <input
                ref={inputRef}
                type="text"
                value={playlist.name}
                onKeyDown={submitChange}
                onChange={handleChange}
                onBlur={() => setIsEditing(false)} // Fallback if clicking outside fails
                autoFocus
                className="text-black"
              />
            ) : (
              <div
                className="hover:cursor-pointer underline"
                onClick={handleDivClick}
              >
                {playlist.name}
              </div>
            )}
          </div>
          <h1 className="text-red-600">
            Videos:{" "}
            <span className="text-white">{playlist.videos.length} / 60</span>
          </h1>

          <div
            onClick={() => {
              shufflePlaylist();
            }}
            className="hover:bg-cinnabar-500 cursor-pointer rounded-full flex justify-center align-middle border-2 border-cinnabar-500 p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 0 24 24"
              width="20px"
              fill="#e8eaed"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="w-full h-8 mb-4 text-right mr-4 pr-6">
        {playlist.videos.length >= 10 && (
          <button
            onClick={submitPlaylist}
            className="px-2 py-2 w-32 mb-3 bg-red-500 hover:bg-red-700 rounded-lg text-sm font-semibold transition duration-300"
          >
            Submit
          </button>
        )}
      </div>
      {playlist.videos.map((video: Video) => {
        return (
          <PlaylistTrack
            key={playlist.videos.indexOf(video)}
            playlist={playlist}
            setPlaylistTracks={setPlaylistTracks}
            video={video}
            setPlayVideo={setPlayVideo}
            setPlaylist={setPlaylist}
            isEdit={isEdit}
          />
        );
      })}
    </div>
  );
}
