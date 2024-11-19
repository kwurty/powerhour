import { useEffect, useState } from "react";
import YoutubePlayer from "../components/youtubeplayer";
import YoutubeSearch from "../components/youtubesearch";
import PlaylistView from "../components/playlist";
import { Playlist } from "../types/playlist.type";
import {
  Video,
  Snippet,
  YoutubeResponseVideo,
} from "../types/youtubesearch.type";
import { useParams } from "react-router-dom";

type props = {
  isEdit: boolean;
};

export default function CreatePlaylist({ isEdit }: props) {
  const { id } = useParams();
  const [playlistTracks, setPlaylistTracks] = useState<Video[]>([]);

  const [playVideo, setPlayVideo] = useState<YoutubeResponseVideo | Video>({
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

  const [unauthorized, setUnauthorized] = useState<Boolean>(false);

  const [currentVideoTime, setCurrentVideoTime] = useState<number>(0);

  const [playlist, setPlaylist] = useState<Playlist>({
    name: "New Playlist",
    videos: [],
    likes: 0,
    plays: 0,
  });

  // Conditionally set the playlist based on new playlist vs editing playlist.
  // There's probably a better way to do this, but I didn't want to rewrite
  // an entire component that will be essentially the same functionality
  useEffect(() => {
    if (!isEdit) {
      setPlaylist((playlist) => ({
        ...playlist,
        videos: playlistTracks,
      }));
    }
  }, [playlistTracks]);

  useEffect(() => {
    if (!isEdit) {
      if (playlist.videos.length > 0) {
        localStorage.setItem("newPlaylist", JSON.stringify(playlist));
      }
    }
  }, [playlist]);

  useEffect(() => {
    if (!isEdit) {
      // check for existing playlist...
      if (localStorage.getItem("newPlaylist")) {
        let storedPlaylist = localStorage.getItem("newPlaylist");
        if (storedPlaylist) {
          let plObj = JSON.parse(storedPlaylist);
          setPlaylist(plObj);
          setPlaylistTracks(plObj.videos);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (isEdit && id) {
      const getPlaylist = async () => {
        let response = await fetch(
          process.env.REACT_APP_BACKEND_API_BASE_API + "playlists/" + id
        );

        if (response.status === 401) {
          return setUnauthorized(true);
        }

        let playList = await response.json();
        if (playList) {
          setPlaylist(playList);
        }
      };
      getPlaylist();
    }
  }, []);

  const setPlaylistName = (name: string) => {
    setPlaylist((playlist) => ({
      ...playlist,
      name: name,
    }));
  };

  if (!isEdit || (isEdit && !unauthorized && playlist.id != undefined)) {
    return (
      <div className="grid sm:grid-cols-3 sm:grid-rows-1 lg:grid-cols-5 lg:grid-rows-1 ">
        {/* <button onClick={changeVideoHandler}> change video </button> */}

        <div className="lg:col-span-2 sm:col-span-3 sm:overflow-y-scroll sm:pt-2 row-start-1 sm:min-h-48 sm:max-h-48 lg:max-h-screen">
          <PlaylistView
            playlist={playlist}
            setPlaylistTracks={setPlaylistTracks}
            setPlaylistName={setPlaylistName}
            setPlayVideo={setPlayVideo}
          />
        </div>
        <div className="col-span-2 sm:row-start-2 lg:row-start-1 ">
          <div className="w-full">
            <YoutubePlayer
              videoid={playVideo.id}
              setCurrentVideoTime={setCurrentVideoTime}
            />
          </div>
        </div>
        <div className="w-full lg:col-span-1 sm:col-start-3 sm:row-start-2 lg:row-start-1 lg:max-h-screen">
          <YoutubeSearch
            playlistTracks={playlistTracks}
            setPlaylistTracks={setPlaylistTracks}
            setPlayVideo={setPlayVideo}
            currentVideoTime={currentVideoTime}
          />
        </div>
      </div>
    );
  } else if (isEdit && !unauthorized && playlist.id == undefined) {
    return <div>This playlist does not exist.</div>;
  } else if (isEdit && unauthorized) {
    return <div>You do not have permission to edit this playlist.</div>;
  } else {
    return <div> Loading ... </div>;
  }
}
