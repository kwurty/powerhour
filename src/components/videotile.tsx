import { Dispatch, SetStateAction } from "react";
import { Video } from "../types/youtubesearch.type";
// import "../types/videotiles.type";

interface Props {
  video: Video;
  playlistTracks: Video[];
  setPlaylistTracks: Dispatch<SetStateAction<Video[]>>;
  playVideo: (video: Video) => void;
}

export default function Videotile({
  video,
  playlistTracks,
  setPlaylistTracks,
  playVideo,
}: Props) {
  const addToPlayList = (video: Video) => {
    if (!playlistTracks.includes(video)) {
      setPlaylistTracks([...playlistTracks, video]);
    }
  };

  const removeFromPlaylist = (video: Video) => {
    if (playlistTracks.includes(video)) {
      setPlaylistTracks((playlistTracks) => {
        return playlistTracks.filter((track) => {
          return track != video;
        });
      });
    }
  };
  return (
    <div className="flex flex-row">
      <div id="thumbnail" className="w-28">
        {" "}
        <img
          className="w-auto"
          src={video?.snippet?.thumbnails?.default?.url}
          alt="youtube thumbnail"
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            playVideo(video);
          }}
        />
      </div>
      <div id="content" className="text-left w-3/5 pl-4">
        <div className="w-full max-h-6 overflow-clip">
          <h1 className="text-sm overflow-clip max-w-xs font-bold">
            {video.snippet.title}
          </h1>
        </div>
        <h3 className="text-sm">{video.snippet.channelTitle}</h3>
        <h3>{video.contentDetails?.duration}</h3>
        {!playlistTracks.includes(video) && (
          <button
            className="rounded bg-blue-300 border border-slate-700 py-1 px-3 text-blue-700"
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              addToPlayList(video);
            }}
          >
            Add To Playlist
          </button>
        )}
        {playlistTracks.includes(video) && (
          <button
            className="rounded bg-blue-300 border border-slate-700 py-1 px-3 text-blue-700"
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              removeFromPlaylist(video);
            }}
          >
            Remove From Playlist
          </button>
        )}
      </div>
    </div>
  );
}
