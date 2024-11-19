import React, { useState, useEffect, Dispatch, SetStateAction } from "react";

import {
  Video,
  ItemsEntity,
  YoutubeSearchResult,
  YoutubeResponseVideo,
} from "../types/youtubesearch.type";
import Videotile from "./videotile";
import { convertResponseVideoToVideo } from "../services/convert-types";

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
  const [searchString, setSearchString] = useState<string>("kittycat");
  const [searchResults, setSearchResults] = useState<YoutubeResponseVideo[]>(
    []
  );

  const executeSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    search();
  };

  const playNow = (video: YoutubeResponseVideo | Video) => {
    setPlayVideo(video);
  };

  const search = async () => {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_API_BASE_API +
        "youtube/search?q=" +
        searchString
    );

    const youtubeSearchResults: YoutubeSearchResult = await response.json();

    setSearchResults(youtubeSearchResults.items);
  };

  useEffect(() => {
    if (currentVideoTime !== 0) {
      console.log(currentVideoTime);
    }
  }, [currentVideoTime]);

  return (
    <div className="">
      <div className="mx-4 pb-4 pt-4 flex justify-center bg-gray-100">
        <div className="flex w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <input
            type="text"
            value={searchString}
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              setSearchString(event.currentTarget.value);
            }}
            placeholder="Search..."
            className="flex-grow px-4 py-2 text-gray-700 bg-transparent focus:outline-none focus:ring focus:ring-blue-300 rounded-l-lg"
          />
          <button
            onClick={executeSearch}
            className="px-4 py-2 text-white bg-blue-600 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Search
          </button>
        </div>
      </div>
      <div className="overflow-y-scroll overflow-x-hidden overflow-y-scroll max-h-screen ">
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
    </div>
  );
}
