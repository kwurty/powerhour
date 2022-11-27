import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { Playlist } from "../types/playlist.type";
import { Video } from "../types/youtubesearch.type";
import PlaylistTrack from "./playlisttrack";

interface Props {
  playlist: Playlist;
  setPlaylistTracks: Dispatch<SetStateAction<Video[]>>;
}

export default function PlaylistView({ playlist, setPlaylistTracks }: Props) {
  const [playlistName, setPlaylistName] = useState<string>(playlist.name);

  useEffect(() => {
    const updateName = setTimeout(() => {
      console.log("updating time...");
      playlist.name = playlistName;
    }, 500);
    return () => {
      clearTimeout(updateName);
    };
  }, [playlistName]);

  return (
    <div>
      <div className="flex w-100 justify-between px-4">
        <div className="flex">
          <input
            value={playlistName}
            onChange={(e) => {
              setPlaylistName(e.target.value);
            }}
            defaultValue="Playlist"
            className="border border-solid"
          />
          <h1>{playlist.videos.length} / 60</h1>
        </div>
        {playlist.videos.length >= 10 && <button>Submit Playlist</button>}
      </div>
      {playlist.videos.map((video: Video) => {
        return (
          <PlaylistTrack
            playlist={playlist}
            setPlaylistTracks={setPlaylistTracks}
            video={video}
          />
        );
      })}
    </div>
  );
}
