import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'

import { Video, ItemsEntity } from '../types/youtubesearch.type'
import Videotile from './videotile'

interface Props {
  playlistTracks: Video[]
  setPlaylistTracks: Dispatch<SetStateAction<Video[]>>
  setPlayVideo: Dispatch<SetStateAction<Video>>
  currentVideoTime: number
}

export default function YoutubeSearch({
  playlistTracks,
  setPlaylistTracks,
  setPlayVideo,
  currentVideoTime
}: Props) {
  const [searchString, setSearchString] = useState<string>('kittycat')
  const [searchResults, setSearchResults] = useState<Video[]>([])

  const executeSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    search()
  }

  const playNow = (video: Video) => {
    setPlayVideo(video)
  }

  const search = async () => {
    const resultListUnparsed = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${
        process.env.REACT_APP_YOUTUBE_API_KEY
      }&type=video&maxResults=50&part=snippet&q=${encodeURIComponent(searchString)}`
    )
    const resultList = await resultListUnparsed.json()

    const ids = resultList?.items?.map((video: ItemsEntity) => {
      return video.id.videoId
    })

    const videoResultsUnparsed = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${
        process.env.REACT_APP_YOUTUBE_API_KEY
      }&part=snippet,contentDetails&id=${ids.join(',')}`
    )

    const videoResults = await videoResultsUnparsed.json()

    setSearchResults(videoResults?.items)
    console.dir(videoResults)
  }

  useEffect(() => {
    if (currentVideoTime !== 0) {
      console.log(currentVideoTime)
    }
  }, [currentVideoTime])

  return (
    <div className="">
      <form>
        <label htmlFor="searchString">Search: </label>
        <input
          className="border-gray-500 border pl-1 rounded"
          value={searchString}
          onChange={(event: React.FormEvent<HTMLInputElement>) => {
            setSearchString(event.currentTarget.value)
          }}
        ></input>
        <button onClick={executeSearch}>Search</button>
      </form>
      <div className="overflow-y-scroll overflow-x-hidden overflow-y-scroll max-h-screen ">
        {searchResults.map((video: Video, index) => {
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
          )
        })}
      </div>
    </div>
  )
}
