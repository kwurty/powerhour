import React, { useState, useEffect, Dispatch, SetStateAction } from "react";

import {
  Video,
  ItemsEntity,
  YoutubeSearchResult,
  YoutubeResponseVideo,
} from "../types/youtubesearch.type";
import Videotile from "./videotile";
import { convertResponseVideoToVideo } from "../services/convert-types";
import Loading from "./loading";

interface Props {
  playlistTracks: Video[];
  setPlaylistTracks: Dispatch<SetStateAction<Video[]>>;
  setPlayVideo: Dispatch<SetStateAction<YoutubeResponseVideo | Video>>;
  currentVideoTime: number;
}

export default function YoutubeSearch({
  playlistTracks,
  setPlaylistTracks,
  setPlayVideo,
  currentVideoTime,
}: Props) {
  const [searchString, setSearchString] = useState<string>("");
  const [searchResults, setSearchResults] = useState<YoutubeResponseVideo[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);

  const executeSearch = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    search();
  };

  const playNow = (video: YoutubeResponseVideo | Video) => {
    setPlayVideo(video);
  };

  const search = async () => {
    setLoading(true);
    const response = await fetch(
      process.env.REACT_APP_BACKEND_API_BASE_API +
        "youtube/search?q=" +
        searchString
    );

    const youtubeSearchResults: YoutubeSearchResult = await response.json();
    if (youtubeSearchResults) {
      setLoading(false);
      setSearchResults(youtubeSearchResults.items);
    }
  };

  useEffect(() => {
    if (currentVideoTime !== 0) {
      console.log(currentVideoTime);
    }
  }, [currentVideoTime]);

  return (
    <div className="">
      <div className="mx-2 w-full flex px-4 py-3 rounded-md border-2 border-red-600 overflow-hidden max-w-md font-[sans-serif]">
        <input
          type="email"
          placeholder="Search Something..."
          className="w-full outline-none bg-transparent text-gray-100 text-sm"
          value={searchString}
          onChange={(event: React.FormEvent<HTMLInputElement>) => {
            setSearchString(event.currentTarget.value);
          }}
          onKeyDownCapture={(event: React.KeyboardEvent) => {
            if (event.key === "Enter") {
              search();
            }
          }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 192.904 192.904"
          width="16px"
          className="fill-gray-300 cursor-pointer"
          onClick={executeSearch}
        >
          <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
        </svg>
      </div>
      {loading && <Loading />}
      {!loading && (
        <div className="overflow-y-scroll overflow-x-hidden lg:max-h-vh-minus-256">
          {searchResults &&
            searchResults.map((video: YoutubeResponseVideo, index) => {
              return (
                <div key={video.id}>
                  <Videotile
                    video={video}
                    playlistTracks={playlistTracks}
                    setPlaylistTracks={setPlaylistTracks}
                    playVideo={playNow}
                  />
                  {/* 
              <button
                onClick={() => {
                  console.log(currentVideoTime);
                }}
              >
                Get Current Video Time
              </button> */}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
