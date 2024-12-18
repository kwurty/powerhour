import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { Playlist } from "../types/playlist.type";
import { Video, YoutubeResponseVideo } from "../types/youtubesearch.type";
import { convertToSeconds, isoConvert, timeObject } from "../services/tools";

interface Props {
  playlist: Playlist;
  video: Video;
  setPlaylistTracks: Dispatch<SetStateAction<Video[]>>;
  setPlayVideo: (video: YoutubeResponseVideo | Video) => void;
}

export default function Playlisttrack({
  playlist,
  video,
  setPlaylistTracks,
  setPlayVideo,
}: Props) {
  const [startTime, setStartTime] = useState<number>(video.starttime || 0);
  const [duration, setDuration] = useState<number>(0);

  const removeFromPlaylist = (video: Video) => {
    if (playlist.videos.includes(video)) {
      setPlaylistTracks((playlistTracks) => {
        return playlistTracks.filter((track) => {
          return track !== video;
        });
      });
    }
  };

  const updateTime = () => {
    setPlaylistTracks((previousTracks) =>
      previousTracks.map((track) =>
        video.id === track.id ? { ...track, starttime: startTime } : track
      )
    );
  };

  const convertToDisplayTime = (time: number) => {
    return new Date(time * 1000).toISOString().substr(11, 8);
  };

  const playNow = (video: YoutubeResponseVideo | Video) => {
    setPlayVideo(video);
  };

  useEffect(() => {
    video.starttime = startTime;
  }, [startTime, video]);

  useEffect(() => {
    if (video && video.duration) {
      let time = isoConvert(video.duration);
      if (time) {
        let newDuration: number = convertToSeconds(time);
        setDuration(newDuration);
      }
    }
  }, []);

  return (
    <div id={video.id} className="flex flex-col w-full pl-5 pr-5">
      <div className="w-full flex justify-between">
        <h1
          className="h-6 truncate pr-4 hover:cursor-pointer underline hover:text-red-500"
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            if ((event.target as HTMLInputElement).tagName !== "BUTTON") {
              playNow(video);
            }
          }}
        >
          {video.name}
        </h1>
        <div
          className="hover:cursor-pointer"
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            removeFromPlaylist(video);
          }}
        >
          <svg
            className="w-5 h-5 text-red-500 hover:bg-red-200 hover:text-red-700 hover:rounded-xl"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
      <div className="flex justify-between text-base align-baseline">
        <div>
          <label
            className="text-sm text-gray-500"
            // onClick={(event: React.MouseEvent<HTMLElement>) => updateTime()}
          >
            {" "}
            Start time:{" "}
          </label>
          <input
            className="h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
            type="range"
            min="0"
            max={duration.toString()}
            name="duration"
            id={video.id + "_duration"}
            value={startTime}
            onChange={(e) => {
              setStartTime(parseInt(e.target.value));
            }}
          />
        </div>
        <label>
          Time (HH:MM:SS):{" "}
          <input
            type="text"
            value={convertToDisplayTime(startTime)}
            onChange={(e) => {
              const value = e.target.value;
              console.log(value);
              if (/^\d{0,2}:\d{0,2}:\d{0,2}$/.test(value)) {
                // Allow only valid HH:MM:SS formats during typing
                console.log(parseInt(value));
                setStartTime(parseInt(value));
              }
            }}
            placeholder="00:00:00"
            style={{ width: "100px", textAlign: "center" }}
          />
        </label>
        <output
          className="border border-solid"
          // onClick={(event: React.MouseEvent<HTMLElement>) => updateTime}
        >
          {convertToDisplayTime(startTime)}
        </output>
      </div>
    </div>
  );
}
