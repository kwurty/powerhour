import React, { useState } from "react";
import { Playlist } from "../types/playlist.type";
import { Video } from "../types/youtubesearch.type";

interface Props {
  playlist: Playlist;
}

export default function PlaylistView({ playlist }: Props) {
  return (
    <div>
      {playlist.videos.map((video: Video) => {
        return (
          <div id={video.id}>
            <h1>{video.snippet.title}</h1>
          </div>
        );
      })}
    </div>
  );
}
