import React from "react";

export default function NowPlaying() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
      <div className="w-full bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-red-500 mb-4">
          Now Playing
        </h2>
        <div className="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/100"
            alt="Album Art"
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div>
            <p className="text-lg font-semibold">Song Title</p>
            <p className="text-sm text-gray-400">Artist Name</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="bg-gray-700 h-2 rounded-full overflow-hidden">
            <div className="bg-red-500 h-full w-1/2"></div>
          </div>
          <div className="flex justify-between text-sm text-gray-400 mt-1">
            <span>1:24</span>
            <span>3:45</span>
          </div>
        </div>
      </div>

      <div className="w-full bg-gray-800 rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-semibold text-red-500 mb-4">Up Next</h2>
        <ul className="space-y-3">
          <li className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/50"
              alt="Album Art"
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <p className="text-sm font-semibold">Next Song Title</p>
              <p className="text-xs text-gray-400">Next Artist Name</p>
            </div>
          </li>
          <li className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/50"
              alt="Album Art"
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <p className="text-sm font-semibold">Another Song Title</p>
              <p className="text-xs text-gray-400">Another Artist Name</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
