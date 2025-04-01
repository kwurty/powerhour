import { useEffect, useState } from "react";
import YoutubePlayer from "../components/youtubeplayer";
import YoutubeSearch from "../components/youtubesearch";
import PlaylistView from "../components/playlist";
import { Playlist } from "../types/playlist.type";
import { setLocalStorage, getLocalStorage } from "../services/tools";
import { Video, YoutubeResponseVideo } from "../types/youtubesearch.type";
import { useParams } from "react-router-dom";

import { useUser } from "../services/user";

type props = {
  isEdit: boolean;
};

export default function CreatePlaylist({ isEdit }: props) {
  const { id } = useParams();
  const { user } = useUser();
  const [playlistTracks, setPlaylistTracks] = useState<Video[]>([]);

  const [playVideo, setPlayVideo] = useState<YoutubeResponseVideo | Video>({
    kind: "youtube#video",
    etag: "yhnL9TPZaE5vmy8y7Q7P6NrxVDE",
    id: "pbqB2vOFdlc",
    user_id: 0,
    user_name: "",
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
    contentDetails: {
      duration: "PT1M",
      dimension: "2d",
      definition: "hd",
      caption: "false",
      licensedContent: true,
      contentRating: {},
      projection: "rectangular",
    },
  });

  const [currentVideoTime, setCurrentVideoTime] = useState<number>(0);

  const [playlist, setPlaylist] = useState<Playlist>({
    name: "New Playlist",
    videos: [],
    likes: 0,
    plays: 0,
    user_id: 0,
    user_name: "",
  });

  // Conditionally set the playlist based on new playlist vs editing playlist.
  // There's probably a better way to do this, but I didn't want to rewrite
  // an entire component that will be essentially the same functionality
  useEffect(() => {
    setPlaylist((playlist) => ({
      ...playlist,
      videos: playlistTracks,
    }));
  }, [playlistTracks]);

  useEffect(() => {
    if (!isEdit) {
      if (playlist.videos.length > 0) {
        setLocalStorage("newPlaylist", playlist);
      }
    } else {
      if (playlist.videos.length > 0) {
        setLocalStorage("editPlaylist", playlist);
      }
    }
  }, [playlist]);

  useEffect(() => {
    if (!isEdit) {
      // check for existing playlist...
      const localNewPlaylist = getLocalStorage("newPlaylist");
      if (localNewPlaylist) {
        setPlaylist(localNewPlaylist);
        setPlaylistTracks(localNewPlaylist.videos);
      }
    } else {
      const localEditPlaylist = getLocalStorage("editPlaylist");
      if (localEditPlaylist && id && localEditPlaylist.id === id) {
      } else {
        const getPlaylist = async () => {
          let response = await fetch(
            process.env.REACT_APP_BACKEND_API_BASE_API + "playlists/" + id
          );

          let playList = await response.json();
          if (playList) {
            setPlaylist(playList);
            setPlaylistTracks(playList.videos);
          }
        };
        getPlaylist();
      }
    }
  }, []);

  const setPlaylistName = (name: string) => {
    setPlaylist((playlist) => ({
      ...playlist,
      name: name,
    }));
  };

  if (
    !isEdit ||
    (isEdit &&
      user &&
      id &&
      playlist.user_id === user.id &&
      playlist.id !== undefined)
  ) {
    return (
      <div className="grid sm:grid-cols-3 sm:grid-rows-1 lg:grid-cols-7 lg:grid-rows-1 ">
        {/* <button onClick={changeVideoHandler}> change video </button> */}

        <div className="lg:col-span-2 sm:col-span-3 sm:overflow-y-scroll sm:pt-2 row-start-1 sm:min-h-48 sm:max-h-48 lg:max-h-screen bg-gray-900">
          <PlaylistView
            playlist={playlist}
            setPlaylistTracks={setPlaylistTracks}
            setPlaylistName={setPlaylistName}
            setPlayVideo={setPlayVideo}
            setPlaylist={setPlaylist}
            isEdit={isEdit}
          />
        </div>
        <div className="col-span-3 sm:row-start-2 lg:row-start-1 ">
          <div className="w-full">
            <YoutubePlayer
              videoid={playVideo.id}
              setCurrentVideoTime={setCurrentVideoTime}
            />
          </div>
        </div>
        <div className="w-full lg:col-span-2 sm:col-start-3 sm:row-start-2 lg:row-start-1 lg:max-h-screen bg-gray-900">
          <YoutubeSearch
            playlistTracks={playlistTracks}
            setPlaylistTracks={setPlaylistTracks}
            setPlayVideo={setPlayVideo}
            currentVideoTime={currentVideoTime}
          />
        </div>
      </div>
    );
  } else if (isEdit && playlist.id === undefined) {
    return (
      <div className="text-white w-full flex justify-center align-middle pt-5 text-lg">
        This playlist does not exist.
      </div>
    );
  } else if (isEdit && user) {
    return (
      <div className="text-white w-full flex justify-center align-middle pt-5 text-lg">
        You do not have permission to edit this playlist.
      </div>
    );
  } else if (!user) {
    return (
      <div className="text-white w-full flex justify-center align-middle pt-5 text-lg">
        You must be logged in to edit a playlist
      </div>
    );
  } else {
    return (
      <div className="text-white w-full flex justify-center align-middle pt-5 text-lg">
        {" "}
        Loading ...{" "}
      </div>
    );
  }
}
