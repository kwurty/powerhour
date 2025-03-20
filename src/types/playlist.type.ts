import { Video } from './youtubesearch.type'

export type Author = {
  name: string
}

<<<<<<< HEAD
export type Playlist = {
  id?: number;
  name: string;
  videos: Video[];
  likes: number;
  plays: number;
  user_id: number;
  user_name: string;
};

export type CreatedPlaylist = {
  id: number;
  name: string;
  videos: Video[];
  likes?: number;
  plays?: number;
  like_count: number;
  playlist_id: number;
};

export type ReturnedPlaylist = {
  playlist_id: number;
  playlist_name: string;
  user_id: number;
  user_name: string;
  like_count: number;
  user_liked?: number;
  user_bookmarked?: number;
};

export type PlaylistEdit = {
  name: string;
  videos: Video[];
  userid: number;
  username: string;
  id: number;
  likes: number;
  plays: number;
};
=======
export type PlaylistType = {
  id?: number
  name: string
  videos: Video[]
  likes: number
  plays: number
}

export type CreatedPlaylist = {
  id: number
  name: string
  videos: Video[]
  likes?: number
  plays?: number
}
export type PlaylistEditType = {
  name: string
  videos: Video[]
  userid: number
  username: string
  id: number
  likes: number
  plays: number
}

export type PlaylistTileType = {
  playlist_id: number
  playlist_name: string
  user_id: number
  user_name: string
  like_count: number
}
>>>>>>> d2bd5a5736a06c310529b5b73157898bbbc4fcaa
