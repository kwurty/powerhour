import { Link } from "react-router-dom";
import "../styles/homepage.scss"; // CSS for parallax effects

const HomePage = () => {
  return (
    <div className="relative">
      {/* Video Background Section */}
      <div className="relative h-screen flex items-center justify-center text-white text-center overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
        >
          <source src="../media/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 bg-black bg-opacity-50 p-8 rounded-lg">
          <h1 className="text-4xl sm:text-6xl font-bold mb-4">
            Power Hour Generator
          </h1>
          <p className="text-lg sm:text-xl font-light">
            The ultimate app for creating YouTube-based power hour playlists.
          </p>
        </div>
      </div>

      {/* Description Section */}
      <div className="py-16 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8">
          What is Power Hour Generator?
        </h2>
        <p className="text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
          Power Hour Generator lets you create custom playlists for a power hour
          drinking game using YouTube videos. Choose your favorite clips, set
          time intervals, and let the app handle the rest. Whether you're
          planning a party or just want to enjoy some music with friends, this
          app makes it easy to keep the fun going.
        </p>
      </div>

      {/* Call-to-Action Section */}
      <div className="py-16 bg-gradient-to-b from-indigo-600 to-purple-600 text-white text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Ready to Get Started?
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/playlists"
            className="px-8 py-4 bg-indigo-800 hover:bg-indigo-700 rounded-lg text-lg font-semibold transition duration-300"
          >
            Explore Playlists
          </Link>
          <Link
            to="/create"
            className="px-8 py-4 bg-purple-800 hover:bg-purple-700 rounded-lg text-lg font-semibold transition duration-300"
          >
            Create a Playlist
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
