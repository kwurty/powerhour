import { Video } from "./youtubesearch.type";

export type Author = {
  name: string;
};

export type Playlist = {
  id?: number;
  name: string;
  videos: Video[];
  likes: number;
  plays: number;
};

export type CreatedPlaylist = {
  id: number;
  name: string;
  videos: Video[];
  likes?: number;
  plays?: number;
}
export type PlaylistEdit = {
  name: string,
  videos: Video[],
  userid: number,
  username: string,
  id: number,
  likes: number,
  plays: number
}