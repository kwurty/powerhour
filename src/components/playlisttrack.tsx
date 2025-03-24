import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { Playlist } from "../types/playlist.type";
import { Video, YoutubeResponseVideo } from "../types/youtubesearch.type";
import {
  convertToSeconds,
  deleteLocalStorage,
  isoConvert,
  debounce,
} from "../services/tools";

import { toast } from "react-toastify";

interface Props {
  playlist: Playlist;
  video: Video;
  setPlaylistTracks: Dispatch<SetStateAction<Video[]>>;
  setPlayVideo: (video: YoutubeResponseVideo | Video) => void;
  setPlaylist: Dispatch<SetStateAction<Playlist>>;
  isEdit: boolean;
}

type displayTimeType = {
  hours: number;
  minutes: number;
  seconds: number;
};

export default function Playlisttrack({
  playlist,
  video,
  setPlaylistTracks,
  setPlayVideo,
  setPlaylist,
  isEdit,
}: Props) {
  const [startTime, setStartTime] = useState<number>(video.starttime || 0);
  const [duration, setDuration] = useState<number>();
  const [displayedTime, setDisplayedTime] = useState<displayTimeType>();

  const removeFromPlaylist = (video: Video) => {
    if (playlist.videos.includes(video)) {
      setPlaylistTracks((playlistTracks) => {
        return playlistTracks.filter((track) => {
          return track !== video;
        });
      });
    }
    if (playlist.videos.length === 0 && isEdit) {
      deleteLocalStorage("newPlaylist");
    }
  };

  const displayTime = () => {
    if (startTime === 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    } else if (Number(startTime) && startTime) {
      const hrs = Math.floor(startTime / 3600) || 0;
      const mins = Math.floor((startTime % 3600) / 60) || 0;
      const secs = startTime % 60 || 0;
      return { hours: hrs, minutes: mins, seconds: secs };
    }
  };

  const playNow = (video: YoutubeResponseVideo | Video) => {
    setPlayVideo(video);
  };

  // Function to show toast
  const showToast = () => {
    toast("There needs to be at least 60 seconds!");
  };

  // Debounced version of the trigger logic
  const debouncedShowToast = debounce(showToast, 300);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (duration && Number(e.target.value) > duration - 60) {
      debouncedShowToast();
      return;
    }
    setStartTime(Number(e.target.value));
  };

  const handleManualInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!duration) return;

    const value = e.target.value;
    const [hrs = 0, mins = 0, secs = 0] = value.split(":").map(Number);

    // Convert input to total seconds and clamp within bounds
    const totalSeconds = hrs * 3600 + mins * 60 + secs;
    if (duration && totalSeconds > duration - 60) {
      toast("There needs to be at least 60 seconds!");
      return setStartTime(duration - 62);
    }
    if (!isNaN(totalSeconds)) {
      setStartTime(Math.min(Math.max(totalSeconds, 0), duration));
    }
  };

  useEffect(() => {
    setDisplayedTime(displayTime());
    setPlaylistTracks((previousTracks) => {
      return previousTracks.map((track, index) => {
        if (track.id === video.id) {
          track.starttime = startTime;
        }
        return track;
      });
    });
  }, [startTime]);

  useEffect(() => {
    if (video && video.starttime) {
      setStartTime(video.starttime);
    } else {
      setStartTime(0);
    }
    if (video && video.duration) {
      let time = isoConvert(video.duration);
      if (time) {
        let newDuration: number = convertToSeconds(time);
        setDuration(newDuration);
      }
    }
  }, [video]);

  return (
    <div
      id={video.id}
      className="flex flex-col w-full pl-5 pr-5 max-h-vh-minus-256"
    >
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
            className="w-5 h-5 text-cinnabar-500 hover:bg-cinnabar-500 hover:text-white hover:rounded-xl"
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
          <div className="sliderContainer">
            <input
              type="range"
              min="0"
              max={duration}
              value={startTime}
              onChange={(e) => {
                handleSliderChange(e);
              }}
              className="slider accent-cinnabar-500"
            />
          </div>
        </div>
        {displayedTime && (
          <div className="flex flex-col justify-between align-baseline">
            <label
              className="text-sm text-gray-500 text-center"
              // onClick={(event: React.MouseEvent<HTMLElement>) => updateTime()}
            >
              {" "}
              HH:MM:SS{" "}
            </label>
            <input
              type="text"
              placeholder="HH:MM:SS"
              value={`${displayedTime.hours
                .toString()
                .padStart(2, "0")}:${displayedTime.minutes
                .toString()
                .padStart(2, "0")}:${displayedTime.seconds
                .toString()
                .padStart(2, "0")}`}
              onChange={handleManualInputChange}
              className="input text-white rounded-md text-center bg-transparent border border-white focus:outline-none"
              style={{ width: "80px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
