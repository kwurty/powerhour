import { Dispatch, SetStateAction, useState, useEffect } from "react";
import {
  Video,
  ItemsEntity,
  YoutubeResponseVideo,
} from "../types/youtubesearch.type";
import { isoConvert } from "../services/tools";
import { VideoTime } from "../types/tools.type";
import { convertResponseVideoToVideo } from "../services/convert-types";
// import "../types/videotiles.type";

interface Props {
  video: YoutubeResponseVideo;
  playlistTracks: Video[];
  setPlaylistTracks: Dispatch<SetStateAction<Video[]>>;
  playVideo: (video: YoutubeResponseVideo | Video) => void;
}

export default function Videotile({
  video,
  playlistTracks,
  setPlaylistTracks,
  playVideo,
}: // playVideo,
Props) {
  const [videoTime, setVideoTime] = useState<VideoTime>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const findInPlaylist = (video: YoutubeResponseVideo) => {
    return playlistTracks.findIndex((v) => v.id === video.id);
  };

  const addToPlayList = (video: YoutubeResponseVideo) => {
    let converted = convertResponseVideoToVideo(video);
    setPlaylistTracks((previousTracks) => [...previousTracks, converted]);
  };

  const removeFromPlaylist = (video: YoutubeResponseVideo) => {
    setPlaylistTracks((playlistTracks) => {
      return playlistTracks.filter((track) => {
        return track.id !== video.id;
      });
    });
  };

  useEffect(() => {
    if (video.contentDetails?.duration) {
      let hours = isoConvert(video.contentDetails.duration)?.hours;
      let minutes = isoConvert(video.contentDetails.duration)?.minutes;
      let seconds = isoConvert(video.contentDetails.duration)?.seconds;

      setVideoTime({
        hours,
        minutes,
        seconds,
      });
    }
  }, []);

  return (
    <div
      className="flex flex-row hover:bg-slate-500 cursor-pointer"
      onClick={(event: React.MouseEvent<HTMLElement>) => {
        if ((event.target as HTMLInputElement).id !== "toggle-playlist-video") {
          playVideo(video);
        }
      }}
    >
      <div id="thumbnail" className="w-28 relative bg-black">
        <span className="z-10 bg-black text-white absolute bottom-0 right-0">
          {video?.contentDetails?.duration && (
            <div>
              {(videoTime.hours &&
                videoTime.hours > 0 &&
                videoTime.hours.toString().padStart(2, "0") + ":") ||
                ""}
              {(videoTime.minutes &&
                videoTime.minutes > 0 &&
                videoTime.minutes.toString().padStart(2, "0")) ||
                "00"}
              :
              {(videoTime.seconds &&
                videoTime.seconds > 0 &&
                videoTime.seconds.toString().padStart(2, "0")) ||
                "00"}
            </div>
          )}
        </span>
        <img
          className="w-auto"
          src={video?.snippet?.thumbnails?.default?.url}
          alt="youtube thumbnail"
        />
      </div>
      <div id="content" className="text-left w-3/5 pl-4">
        <div className="w-full max-h-6 overflow-clip">
          <h1 className="text-sm overflow-clip max-w-xs font-bold text-gray-100">
            {video.snippet.title}
          </h1>
        </div>
        <h3 className="text-sm text-gray-100">{video.snippet.channelTitle}</h3>
        <div className="w-full flex justify-end pr-2 mb-2">
          <div id="toggle-playlist-video">
            {findInPlaylist(video) === -1 && (
              <button
                id="toggle-playlist-video"
                className="bg-cinnabar-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600"
                aria-label="Add"
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                  addToPlayList(video);
                }}
              >
                <svg
                  id="toggle-playlist-video"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    id="toggle-playlist-video"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            )}
            {findInPlaylist(video) !== -1 && (
              <button
                id="toggle-playlist-video"
                className="bg-gray-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-900"
                aria-label="Delete"
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                  removeFromPlaylist(video);
                }}
              >
                <svg
                  id="toggle-playlist-video"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    id="toggle-playlist-video"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M4 7h16M9 3h6m-6 0a1 1 0 00-1 1v1h8V4a1 1 0 00-1-1m-6 0h6"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
