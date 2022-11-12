// ts
import { request } from "http";
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import YouTube, { YouTubeProps, YouTubePlayer } from "react-youtube";

type Props = {
  videoid: string;
  setCurrentVideoTime: Dispatch<SetStateAction<number>>;
};

let videoElement: YouTubePlayer = null;

export default function YoutubePlayer({ videoid, setCurrentVideoTime }: Props) {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    videoElement = event;
    // access to player in all event handlers via event.target
    if (videoid === "XF8t3z6Mc94") {
      event.target.stopVideo();
    } else {
      event.target.playVideo();
    }
  };

  const opts: YouTubeProps["opts"] = {
    width: "75%",
    height: "75%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  // https://codesandbox.io/s/runtime-hill-c77o1v?file=/src/App.tsx referenced
  useEffect(() => {
    const interval = setInterval(async () => {
      if (videoElement && videoElement.target.getCurrentTime() > 0) {
        const elapsed_seconds = videoElement.target.getCurrentTime();

        // calculations
        setCurrentVideoTime(Math.floor(elapsed_seconds));
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <YouTube
        videoId={videoid}
        className="youtubeContainer"
        opts={opts}
        onReady={onPlayerReady}
      />
    </>
  );
}
