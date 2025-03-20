export interface ProfileRootType {
  profile: ProfileType[];
  created: CreatedType[];
  bookmarked: any[];
  liked: any[];
}

export interface ProfileType {
  user_id: number;
  username: string;
}

export interface CreatedType {
  playlist_id: number;
  playlist_name: string;
  like_count: number;
}

export interface BookmarkedType {
  playlist_id: number;
  playlist_name: string;
  like_count: number;
}

export interface LikedType {
  playlist_id: number;
  playlist_name: string;
  like_count: number;
}
