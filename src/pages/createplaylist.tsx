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

  const [requestCurrentVideoTime, setRequestCurrentVideoTime] =
    useState<boolean>(false);
  const [currentVideoTime, setCurrentVideoTime] = useState<number>(0);
  const [videoid, setVideoid] = useState<string>("veyTWq5aI8w");

  const [playlist, setPlaylist] = useState<Playlist>({
    name: "",
    videos: [],
    likes: 0,
    plays: 0,
  });

  const changeVideoHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setVideoid("qvdnTfyv7y8");
  };

  useEffect(() => {
    setPlaylist((playlist) => ({
      ...playlist,
      videos: playlistTracks,
    }));
  }, [playlistTracks]);

  return (
    <div className="flex h-screen">
      {/* <button onClick={changeVideoHandler}> change video </button> */}

      <div className="w-8/12 h-full">
        <div className="w-auto h-3/4">
          <YoutubePlayer
            videoid={playVideo.id}
            setCurrentVideoTime={setCurrentVideoTime}
          />
        </div>
        <PlaylistView playlist={playlist} />
      </div>
      <div className="w-4/12">
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
