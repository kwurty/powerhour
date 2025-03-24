import { useEffect, useState, useRef } from "react";
import { Playlist } from "../types/playlist.type";
import YouTube, { YouTubeProps } from "react-youtube";
import { useParams } from "react-router-dom";
import NowPlaying from "../components/nowplaying";
import { convertToSeconds, isoConvert } from "../services/tools";

interface props {
  Playlist?: Playlist;
}

export default function Play({ Playlist }: props) {
  const { id } = useParams();
  const [CurrentPlaylist, setCurrentPlaylist] = useState<Playlist>();
  const [currentVideoStartTime, setCurrentVideoStartTime] = useState<number>(0);
  const [currentVideoTime, setCurrentVideoTime] = useState<number>(0);
  const [currentVideoDuration, setCurrentVideoDuration] = useState<number>(0);
  const [currentVideo, setCurrentVideo] = useState<number>(0);
  const [currentvideoId, setcurrentVideoId] = useState<string>(); // Current video ID
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [playerReady, setPlayerReady] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerRef = useRef<any>(null); // Reference to the YouTube player instance
  const videoOptions = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  // DON'T TOUCH THESE - THEY ARE WORKING FINE
  const fetchPlaylist = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_API_BASE_API}playlists/${id}`
    );
    const playlistResponse = await response.json();
    setCurrentPlaylist(playlistResponse);
    setcurrentVideoId(playlistResponse.videos[0].id);
    setCurrentVideoStartTime(playlistResponse.videos[0].starttime || 0);
    let converted = isoConvert(playlistResponse.videos[0].duration);
    const duration = convertToSeconds(converted);
    setCurrentVideoDuration(duration);
  };

  const handlePausePlay = () => {
    if (playerRef.current) {
      const playerState = playerRef.current.getPlayerState();
      if (playerState === 1) {
        // Playing state
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    }
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef && containerRef.current) {
        containerRef.current?.requestFullscreen();
      }
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen((prev) => !prev);
  };

  const togglePlayPause = () => {
    if (playerRef.current) {
      const playerState = playerRef.current.getPlayerState();
      if (playerState === 1) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    }
  };

  const handleStateChange: YouTubeProps["onStateChange"] = (e) => {
    const state = e.target.getPlayerState();
    if (state === -1) {
      setPlayerReady(false);
      console.log("player not ready!");
    } else {
      setPlayerReady(true);
      console.log("player IS ready!");
    }
  };

  const setVideoTime = () => {
    if (playerRef.current && CurrentPlaylist && CurrentPlaylist.videos) {
      handlePausePlay();
      playerRef.current.seekTo(CurrentPlaylist.videos[currentVideo].starttime);
    }
  };

  const goNext = () => {
    // If there is a next video in the playlist
    setPlayerReady(false);
    if (!playerRef.current) return;
    if (CurrentPlaylist?.videos[currentVideo + 1]) {
      // Set video duration
      let nextVideo = CurrentPlaylist?.videos[currentVideo + 1];
      setCurrentVideoTime(nextVideo.starttime || 0);
      if (nextVideo.duration) {
        let converted = isoConvert(nextVideo.duration);
        const duration = convertToSeconds(converted);
        setCurrentVideoDuration(duration);
      }
      setCurrentVideoStartTime(
        CurrentPlaylist.videos[currentVideo + 1].starttime || 0
      );
      setCurrentVideo((currentVideo) => currentVideo + 1);
      setcurrentVideoId(nextVideo.id);
      // setVideoTime();
    }
  };

  useEffect(() => {
    if (Playlist) {
      setCurrentPlaylist(Playlist);
      setcurrentVideoId(Playlist.videos[0].id.toString());
    } else {
      // Fetch current playlist from params
      fetchPlaylist();
    }
  }, []);

  useEffect(() => {
    if (currentVideoTime > currentVideoStartTime + 60) {
      goNext();
    }
    if (currentVideoTime < currentVideoStartTime) {
      if (playerReady) {
        console.log(playerReady);
        setVideoTime();
      }
    }
  }, [currentVideoTime]);

  useEffect(() => {}, []);

  // EDIT THESE IF YOU MUST
  // const handleVideoSwitch = () => {
  //   if (
  //     CurrentPlaylist &&
  //     CurrentPlaylist.videos &&
  //     CurrentPlaylist.videos.length > 0
  //   ) {
  //     setcurrentVideoId(CurrentPlaylist.videos[currentVideo].id);
  //     setCurrentVideoStartTime(
  //       CurrentPlaylist.videos[currentVideo].starttime || 0
  //     );
  //     if (CurrentPlaylist.videos[currentVideo].duration) {
  //       const converted = isoConvert(
  //         CurrentPlaylist.videos[currentVideo].duration
  //       );
  //       const duration = convertToSeconds(converted);
  //       setCurrentVideoDuration(duration);
  //     }
  //     if (playerRef.current) {
  //       playerRef.current.loadVideoById(currentvideoId);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (
  //     currentVideoTime >= currentVideoDuration ||
  //     currentVideoTime > currentVideoStartTime + 60
  //   ) {
  //     setCurrentVideo((currentVideo) => currentVideo + 1);
  //   }
  // }, [currentVideoTime]);

  // useEffect(() => {
  //   handleVideoSwitch();
  //   if (playerRef.current) {
  //     const playerState = playerRef.current.getPlayerState();
  //     // Not playing... so trigger it
  //     if (playerState !== 1) {
  //       playerRef.current.playVideo();
  //     }
  //   }
  // }, [currentVideo]);

  // useEffect(() => {
  //   let timer: NodeJS.Timeout | null = null;
  //   if (isPlaying) {
  //     timer = setInterval(() => {
  //       setCurrentVideoTime((currentTime) => currentTime + 1); // Increment the counter every second
  //     }, 1000);
  //   } else if (timer) {
  //     clearInterval(timer);
  //   }

  //   return () => {
  //     if (timer) clearInterval(timer); // Cleanup the timer when isPlaying changes or on unmount
  //   };
  // }, [isPlaying, CurrentPlaylist, currentVideo]);

  //get current time and video status in real time

  useEffect(() => {
    const interval = setInterval(async () => {
      if (playerRef.current && playerRef.current.getCurrentTime() > 0) {
        const elapsed_seconds = playerRef.current.getCurrentTime();
        setCurrentVideoTime(elapsed_seconds);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (CurrentPlaylist && CurrentPlaylist.videos.length > 0) {
    return (
      <div
        ref={containerRef}
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          width: "100vw",
          overflow: "hidden",
        }}
      >
        <div className="max-w-sm">
          <NowPlaying
            playlist={CurrentPlaylist}
            currentVideo={currentVideo}
            currentVideoTime={currentVideoTime}
            startTime={currentVideoStartTime}
            handleFullscreen={handleFullscreen}
            goNext={goNext}
            togglePlayPause={togglePlayPause}
          />
        </div>

        <div
          style={{
            flex: 1,
            position: "relative",
            backgroundColor: "#000",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <YouTube
            videoId={currentvideoId}
            opts={videoOptions}
            style={{
              width: "100%",
              height: "90%",
            }}
            onReady={(event: { target: any }) => {
              playerRef.current = event.target; // Save the player instance
              console.log("Player ready");
              setVideoTime();
            }}
            onStateChange={handleStateChange}
            onPlay={handlePausePlay}
            onPause={handlePausePlay}
            onEnd={goNext}
          />
        </div>
      </div>
    );
  } else {
    return <div> Loading ...</div>;
  }
}
