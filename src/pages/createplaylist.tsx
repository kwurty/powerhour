import React, { useEffect, useState, forwardRef } from "react";
import YoutubePlayer from "../components/youtubeplayer";
import YoutubeSearch from "../components/youtubesearch";
import PlaylistView from "../components/playlist";
import { Playlist } from "../types/playlist.type";
import { Video, Snippet } from "../types/youtubesearch.type";

export default function CreatePlaylist() {
  const [playlistTracks, setPlaylistTracks] = useState<Video[]>([]);

  const [playVideo, setPlayVideo] = useState<Video>({
    kind: "youtube#video",
    etag: "yhnL9TPZaE5vmy8y7Q7P6NrxVDE",
    id: "XF8t3z6Mc94",
    snippet: {
      publishedAt: "2021-08-06T14:00:26Z",
      channelId: "UCTtPd40aikv5DWdW3KGkrQA",
      title: "Kid-E-Cats | Tasty Episodes Compilation | Cartoons for Kids 2021",
      description:
        "Yummy - this will be your reaction when you watch the new compilation! We all love tasty food and the kittens are not an exception ;)\nGrab something yummy and check out the series!\n\n#KidECats #KidECatsCompilation #compilation",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/XF8t3z6Mc94/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/XF8t3z6Mc94/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/XF8t3z6Mc94/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Kid-E-Cats",
      tags: [
        "kids cartoons",
        "Cartoon",
        "Kid-E-Cats",
        "Three cats",
        "new episodes",
        "Cookie",
        "Pudding",
        "Candy",
        "Russian cartoons",
        "popular",
        "best cartoon",
        "animation",
        "cartoon online",
        "Animated cartoon",
        "for kids",
        "educational cartoons",
        "preschool",
        "Me-wow",
        "cat cartoon",
        "english cartoons for beginners",
        "kids",
        "nursery rhymes",
        "cartoons for children",
        "cartoons for kids",
        "cartoon for kids",
        "kids tv show",
        "baby songs",
        "kids videos",
        "kids songs",
        "cartoons",
        "compilation",
        "videos for kids",
      ],
      categoryId: "1",
      liveBroadcastContent: "none",
      localized: {
        title:
          "Kid-E-Cats | Tasty Episodes Compilation | Cartoons for Kids 2021",
        description:
          "Yummy - this will be your reaction when you watch the new compilation! We all love tasty food and the kittens are not an exception ;)\nGrab something yummy and check out the series!\n\n#KidECats #KidECatsCompilation #compilation",
      },
      defaultAudioLanguage: "en-GB",
    },
  });

  const [currentVideoTime, setCurrentVideoTime] = useState<number>(0);

  const [playlist, setPlaylist] = useState<Playlist>({
    name: "New Playlist",
    videos: [],
    likes: 0,
    plays: 0,
  });

  useEffect(() => {
    setPlaylist((playlist) => ({
      ...playlist,
      videos: playlistTracks,
    }));
  }, [playlistTracks]);

  useEffect(() => {
    if (playlist.videos.length > 0) {
      localStorage.setItem("newPlaylist", JSON.stringify(playlist));
    }
  }, [playlist]);

  useEffect(() => {
    // check for existing playlist...
    if (localStorage.getItem("newPlaylist")) {
      let storedPlaylist = localStorage.getItem("newPlaylist");
      if (storedPlaylist) {
        let plObj = JSON.parse(storedPlaylist);
        setPlaylist(plObj);
        setPlaylistTracks(plObj.videos);
      }
    }
  }, []);

  return (
    <div className="grid gap-2 mt-2 grid-cols-5 grid-rows-1 w-screen h-full">
      {/* <button onClick={changeVideoHandler}> change video </button> */}

      <div className="area col-span-2">
        <PlaylistView
          playlist={playlist}
          setPlaylistTracks={setPlaylistTracks}
        />
      </div>
      <div className="col-span-2">
        <div className="w-full h-full">
          <YoutubePlayer
            videoid={playVideo.id}
            setCurrentVideoTime={setCurrentVideoTime}
          />
        </div>
      </div>
      <div className="w-full col-span-1">
        <YoutubeSearch
          playlistTracks={playlistTracks}
          setPlaylistTracks={setPlaylistTracks}
          setPlayVideo={setPlayVideo}
          currentVideoTime={currentVideoTime}
        />
      </div>
    </div>
  );
}
