import React, { useState, useRef, Dispatch, SetStateAction, useEffect, ReactEventHandler } from 'react'
import { Playlist } from '../types/playlist.type'
import { Video } from '../types/youtubesearch.type'
import PlaylistTrack from './playlisttrack'
import { useUser } from '../services/user'

interface Props {
  playlist: Playlist
  setPlaylistTracks: Dispatch<SetStateAction<Video[]>>
  setPlaylistName: (name: string) => void
}

export default function PlaylistView({ playlist, setPlaylistTracks, setPlaylistName }: Props) {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { user } = useUser()

  // Toggle to input field when the div is clicked
  const handleDivClick = () => {
    setIsEditing(true)
  }

  const submitChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsEditing(false)
      submitChanges()
    }
  }

  // Handle updating the name in the state
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistName(event.target.value)
  }

  // Submit the changes when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setIsEditing(false)
      submitChanges()
    }
  }

  useEffect(() => {
    const updateName = setTimeout(() => {}, 500)
    return () => {
      clearTimeout(updateName)
    }
  }, [playlist.name])

  // Hook to detect clicks outside the input
  useEffect(() => {
    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isEditing])

  // Simulate the fetch request to update the playlist name
  const submitChanges = async () => {
    // Make a check if this is an existing playlist or not - if new, don't submit adjustment post
  }

  const submitPlaylist = async () => {
    if (!user) return
    const token = localStorage.getItem('token')
    try {
      let response = await fetch(`http://localhost:3333/playlists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          userid: user.id,
          name: playlist.name,
          videos: playlist.videos
        })
      })
      if (response.ok) {
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <div className="flex w-100 justify-between px-4">
        <div className="flex w-full justify-between">
          <div className="flex">
            <span className="text-red-600 pr-2"> Name: </span>
            {isEditing ? (
              <input
                ref={inputRef}
                type="text"
                value={playlist.name}
                onKeyDown={submitChange}
                onChange={handleChange}
                onBlur={() => setIsEditing(false)} // Fallback if clicking outside fails
                autoFocus
              />
            ) : (
              <div className="hover:cursor-pointer underline" onClick={handleDivClick}>
                {playlist.name}
              </div>
            )}
          </div>
          <h1 className="text-red-600">
            Videos: <span className="text-white">{playlist.videos.length} / 60</span>
          </h1>
        </div>
        {playlist.videos.length >= 10 && <button onClick={submitPlaylist}>Submit Playlist</button>}
      </div>
      {playlist.videos.map((video: Video) => {
        return (
          <PlaylistTrack
            key={playlist.videos.indexOf(video)}
            playlist={playlist}
            setPlaylistTracks={setPlaylistTracks}
            video={video}
          />
        )
      })}
    </div>
  )
}
