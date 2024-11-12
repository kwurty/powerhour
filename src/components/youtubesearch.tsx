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
      <form>
        <label htmlFor="searchString">Search: </label>
        <input
          className="border-gray-500 border pl-1 rounded"
          value={searchString}
          onChange={(event: React.FormEvent<HTMLInputElement>) => {
            setSearchString(event.currentTarget.value);
          }}
        ></input>
        <button onClick={executeSearch}>Search</button>
      </form>
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
