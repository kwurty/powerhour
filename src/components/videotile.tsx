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
}: // playVideo,
Props) {
  const [videoTime, setVideoTime] = useState<VideoTime>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const convertToVideo = (youtubeVideo: YoutubeResponseVideo) => {
    return {};
  };

  const findInPlaylist = (video: YoutubeResponseVideo) => {
    return playlistTracks.findIndex((v) => v.id === video.id);
  };

  const addToPlayList = (video: YoutubeResponseVideo) => {
    let converted = convertResponseVideoToVideo(video);
    setPlaylistTracks([...playlistTracks, converted]);
  };

  const removeFromPlaylist = (video: YoutubeResponseVideo) => {
    setPlaylistTracks((playlistTracks) => {
      return playlistTracks.filter((track) => {
        return track.id != video.id;
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
      className="flex flex-row hover:bg-slate-300 cursor-pointer"
      onClick={(event: React.MouseEvent<HTMLElement>) => {
        if ((event.target as HTMLInputElement).tagName !== "BUTTON") {
          // playVideo(video);
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
          <h1 className="text-sm overflow-clip max-w-xs font-bold">
            {video.snippet.title}
          </h1>
        </div>
        <h3 className="text-sm">{video.snippet.channelTitle}</h3>
        {findInPlaylist(video) == -1 && (
          <button
            className="rounded bg-blue-300 border border-slate-700 py-1 px-3 text-blue-700"
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              addToPlayList(video);
            }}
          >
            Add To Playlist
          </button>
        )}
        {findInPlaylist(video) != -1 && (
          <button
            className="rounded bg-blue-300 border border-slate-700 py-1 px-3 z-10 text-blue-700"
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
