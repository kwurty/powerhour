import { useState, useEffect } from "react";
import { CreatedPlaylist, Playlist } from "../types/playlist.type";
import PlaylistTile from "./playlisttile";
import { BookmarkedType, CreatedType, LikedType } from "../types/profile.type";
import { Link } from "react-router-dom";

interface Props {
  playlists: CreatedType[] | LikedType[] | BookmarkedType[];
  title: string;
}

export default function CreatedPlaylists({ playlists, title }: Props) {
  const image = "https://picsum.photos/50";
  useEffect(() => {}, []);
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-cinnabar-500 mb-4">{title}</h2>
      <div className="space-y-4">
        {playlists.map((item, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-800 p-4 rounded-lg shadow-md"
          >
            {/* Playlist Image */}
            <img
              src={image}
              alt={item.playlist_name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            {/* Playlist Title */}
            <Link to={`/playlists/${item.playlist_id}`}>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-white">
                  {item.playlist_name}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
