import { useEffect, useState, useRef } from "react";
import { Playlist } from "../types/playlist.type";
import YoutubePlayer from "../components/youtubeplayer";
import YouTube from "react-youtube";
import { useParams } from "react-router-dom";
import NowPlaying from "../components/nowplaying";

interface props {
  Playlist?: Playlist;
}

export default function Play({ Playlist }: props) {
  const { id } = useParams();
  const [CurrentPlaylist, setCurrentPlaylist] = useState<Playlist>();
  const [currentVideoTime, setCurrentVideoTime] = useState<number>(0);
  const [currentVideo, setCurrentVideo] = useState<number>(0);
  const [currentvideoId, setcurrentVideoId] = useState<string>(); // Current video ID
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<any>(null); // Reference to the YouTube player instance

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

  const handlePausePlay = () => {
    if (playerRef.current) {
      const playerState = playerRef.current.getPlayerState();
      if (playerState === 1) {
        // Playing state
        setIsPlaying(true);
        console.log("playing");
      } else {
        setIsPlaying(false);
        console.log("not playing");
      }
    }
  };

  const handleVideoSwitch = () => {
    if (
      CurrentPlaylist &&
      CurrentPlaylist.videos &&
      CurrentPlaylist.videos.length > 0
    ) {
      setcurrentVideoId(CurrentPlaylist.videos[currentVideo].id);
      if (playerRef.current) {
        playerRef.current.loadVideoById(currentvideoId);
      }
    }
  };

  const videoOptions = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  const fetchPlaylist = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_API_BASE_API}playlists/${id}`
    );
    const playlistResponse = await response.json();
    setCurrentPlaylist(playlistResponse);
    setcurrentVideoId(playlistResponse.videos[0].id);
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
    if (currentVideoTime === 60) {
      setCurrentVideoTime(0);
      setCurrentVideo((currentVideo) => currentVideo + 1);
      handleVideoSwitch();
    }
  }, [currentVideoTime]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentVideoTime((currentTime) => currentTime + 1); // Increment the counter every second
      }, 1000);
    } else if (timer) {
      clearInterval(timer);
    }

    return () => {
      if (timer) clearInterval(timer); // Cleanup the timer when isPlaying changes or on unmount
    };
  }, [isPlaying, CurrentPlaylist, currentVideo]);

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
        <div>
          <NowPlaying />
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
            }}
            onPlay={handlePausePlay}
            onPause={handlePausePlay}
          />

          {/* Fullscreen Icon */}
        </div>
      </div>
    );
  } else {
    return <div> Loading ...</div>;
  }
}
