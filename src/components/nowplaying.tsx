import { Playlist } from "../types/playlist.type";
import { useUser } from "../services/user";
import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./modal";

interface Props {
  playlist: Playlist;
  currentVideo: number;
  currentVideoTime: number;
  startTime: number;
  handleFullscreen: () => void;
  goNext: () => void;
  togglePlayPause: () => void;
  isFullScreen?: boolean;
}

export default function NowPlaying({
  playlist,
  currentVideo,
  currentVideoTime,
  startTime,
  handleFullscreen,
  goNext,
  togglePlayPause,
  isFullScreen,
}: Props) {
  const { user, logout } = useUser();

  const [hiddenMode, setHiddenMode] = useState<boolean>(false);

  const [showModal, setShowModal] = useState<boolean>(false);

  const deletePlaylist = async () => {
    // delete playlist
    const deleted = await fetch(
      `http://localhost:3001/playlists/${playlist.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };

  const toggleHiddenMode = () => {
    setHiddenMode(!hiddenMode); // toggle hidden mode
  };

  const [hidePlaylistInfo, setHidePlaylistInfo] = useState<boolean>(false);

  return (
    <div
      className={
        hiddenMode
          ? "w-8"
          : "min-h-screen max-w-sm bg-gray-900 text-white flex flex-col items-center py-10 px-4"
      }
    >
      {!hiddenMode && (
        <div className="w-full bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-red-500 mb-4">
            Now Playing{" "}
            <span className="text-sm text-white align-bottom">
              ({currentVideo + 1} / {playlist.videos.length})
            </span>
          </h2>
          <div className="flex items-center space-x-4">
            <img
              src={playlist.videos[currentVideo].thumbnails.default.url}
              alt="Album Art"
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div className="flex-1 max-w-[calc(100%-7rem)]">
              {" "}
              <p className="text-lg font-semibold text-white truncate">
                {playlist.videos[currentVideo].name}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="bg-gray-700 h-2 rounded-full overflow-hidden">
              {(currentVideo !== undefined || null) &&
                (startTime !== undefined || null) && (
                  <div
                    className="bg-red-500 h-full"
                    style={{
                      width: `${((currentVideoTime - startTime) / 60) * 100}%`,
                    }}
                  ></div>
                )}
            </div>
            <div className="flex justify-between text-sm text-gray-400 mt-1">
              <span>0</span>
              <span>1:00</span>
            </div>
          </div>
        </div>
      )}
      {!hiddenMode && (
        <div className="w-full bg-gray-800 rounded-lg shadow-lg p-4 mb-6">
          <h2 className="text-xl font-semibold text-red-500 mb-4">Up Next</h2>
          <ul className="space-y-3">
            {playlist.videos &&
              playlist.videos[currentVideo + 1] &&
              currentVideo <= playlist.videos.length - 1 && (
                <li className="flex items-center space-x-4">
                  <img
                    src={
                      playlist.videos[currentVideo + 1].thumbnails.default.url
                    }
                    alt="Album Art"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold">
                      {playlist.videos[currentVideo + 1].name}
                    </p>
                    <p className="text-xs text-gray-400">{""}</p>
                  </div>
                </li>
              )}

            {playlist.videos &&
              playlist.videos[currentVideo + 2] &&
              currentVideo <= playlist.videos.length - 2 && (
                <li className="flex items-center space-x-4">
                  <img
                    src={
                      playlist.videos[currentVideo + 2].thumbnails.default.url
                    }
                    alt="Album Art"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold">
                      {playlist.videos[currentVideo + 2].name}
                    </p>
                    <p className="text-xs text-gray-400">{""}</p>
                  </div>
                </li>
              )}
          </ul>
        </div>
      )}
      {!hiddenMode && (
        <div className="w-full bg-gray-800 rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-semibold text-red-500 mb-4">Controls</h2>

          <div className="flex justify-around pb-4">
            <div
              onClick={() => {
                togglePlayPause();
              }}
              className="hover:bg-cinnabar-500 cursor-pointer rounded-full flex justify-center align-middle border-2 border-cinnabar-500 p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="M200-312v-336l240 168-240 168Zm320-8v-320h80v320h-80Zm160 0v-320h80v320h-80Z" />
              </svg>
            </div>
            <div
              onClick={() => {
                goNext();
              }}
              className="hover:bg-cinnabar-500 cursor-pointer rounded-full flex justify-center align-middle border-2 border-cinnabar-500 p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="M660-240v-480h80v480h-80Zm-440 0v-480l360 240-360 240Zm80-240Zm0 90 136-90-136-90v180Z" />
              </svg>
            </div>
            <div
              onClick={() => {
                handleFullscreen();
              }}
              className="hover:bg-cinnabar-500 cursor-pointer rounded-full flex justify-center align-middle border-2 border-cinnabar-500 p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z" />
              </svg>
            </div>
          </div>

          <div className="flex justify-between-pb-4 align-middle justify-center">
            <div onClick={(e) => setHiddenMode((hiddenMode) => !hiddenMode)}>
              <button className="px-2 py-2 w-32 mb-3 bg-red-500 hover:bg-red-700 rounded-lg text-sm font-semibold transition duration-300">
                Hide Sidebar
              </button>
            </div>
          </div>

          {user && user.id === playlist.user_id && (
            <div className="w-full flex justify-center rounded-md shadow-sm">
              <Link to={`/edit/${playlist.id}`}>
                <button className="text-slate-800 hover:text-cinnabar-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </span>
                  <span className="hidden md:inline-block">Edit</span>
                </button>
              </Link>
              <button
                className="text-slate-800 hover:text-cinnabar-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </span>
                <span className="hidden md:inline-block">Delete</span>
              </button>
            </div>
          )}
        </div>
      )}

      {hiddenMode && (
        <div
          className="w-7 bg-black shadow-lg p-4 min-h-screen text-white cursor-pointer flex justify-center items-center"
          onClick={() => {
            setHiddenMode(!hiddenMode);
          }}
        >
          <span className="text-red-500 text-lg font-bold hover:text-red-600 hover:drop-shadow-lg shadow-white opacity-30 hover:opacity-100">
            {" "}
            {">>"}{" "}
          </span>
        </div>
      )}
      {showModal && (
        <Modal
          type="confirmation"
          acceptFunction={() => {}}
          rejectFunction={() => {
            setShowModal(false);
          }}
          message={"Are you sure you want to delete playlist " + playlist.name}
        />
      )}
    </div>
  );
}
