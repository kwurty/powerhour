import { Link } from "react-router-dom";
import { CreatedPlaylist } from "../types/playlist.type";

interface props {
  Name: string;
  Id: number;
  Image: string;
  Playlist: CreatedPlaylist;
}

export default function PlaylistTile({ Name, Id, Image, Playlist }: props) {
  return (
    <Link
      to={`./${Id}`}
      state={{ Playlist: Playlist }}
      className="group block transform hover:scale-105 transition duration-300 ease-in-out shadow-lg rounded-lg overflow-hidden bg-white"
    >
      <div className="aspect-w-16 aspect-h-9">
        <img src={Image} alt={Name} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 text-center bg-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition duration-300">
          {Name}
        </h3>
      </div>
    </Link>
  );
}
