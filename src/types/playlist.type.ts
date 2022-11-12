import { Video } from "./youtubesearch.type";

export type Author = {
  name: string;
};

export type Playlist = {
  name: string;
  videos: Video[];
  likes: number;
  plays: number;
};
