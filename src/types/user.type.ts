import { PlaylistType } from './playlist.type'

export type User = {
  username: string
  email: string
  playlists: PlaylistType[]
}
