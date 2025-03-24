import React, { useEffect, useState } from "react";
import { NavLink, Link, redirect } from "react-router-dom";
import "../styles/nav.scss";
import { useUser } from "../services/user";

export default function Nav() {
  const { user, logout } = useUser();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    redirect("/");
  };
  // return (
  //   <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
  //     <div className="container flex flex-wrap items-center justify-between mx-auto">
  //       <Link to="/" className="flex items-center">
  //         <img
  //           src="https://flowbite.com/docs/images/logo.svg"
  //           className="h-6 mr-3 sm:h-9"
  //           alt="Flowbite Logo"
  //         />
  //         <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
  //           PowerHour Generator
  //         </span>
  //       </Link>
  //       <div className="flex md:order-2">
  //         <button
  //           type="button"
  //           data-collapse-toggle="navbar-search"
  //           aria-controls="navbar-search"
  //           aria-expanded="false"
  //           className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"
  //         >
  //           <svg
  //             className="w-5 h-5"
  //             aria-hidden="true"
  //             fill="currentColor"
  //             viewBox="0 0 20 20"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <path
  //               fillRule="evenodd"
  //               d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
  //               clipRule="evenodd"
  //             ></path>
  //           </svg>
  //           <span className="sr-only">Search</span>
  //         </button>
  //         <div className="relative hidden md:block">
  //           <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
  //             <svg
  //               className="w-5 h-5 text-gray-500"
  //               aria-hidden="true"
  //               fill="currentColor"
  //               viewBox="0 0 20 20"
  //               xmlns="http://www.w3.org/2000/svg"
  //             >
  //               <path
  //                 fillRule="evenodd"
  //                 d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
  //                 clipRule="evenodd"
  //               ></path>
  //             </svg>
  //             <span className="sr-only">Search icon</span>
  //           </div>
  //           <input
  //             type="text"
  //             id="search-navbar"
  //             className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  //             placeholder="Search..."
  //           />
  //         </div>
  //         <button
  //           data-collapse-toggle="navbar-search"
  //           type="button"
  //           className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
  //           aria-controls="navbar-search"
  //           aria-expanded="false"
  //         >
  //           <span className="sr-only">Open menu</span>
  //           <svg
  //             className="w-6 h-6"
  //             aria-hidden="true"
  //             fill="currentColor"
  //             viewBox="0 0 20 20"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <path
  //               fillRule="evenodd"
  //               d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
  //               clipRule="evenodd"
  //             ></path>
  //           </svg>
  //         </button>
  //       </div>
  //       <div
  //         className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
  //         id="navbar-search"
  //       >
  //         <div className="relative mt-3 md:hidden">
  //           <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
  //             <svg
  //               className="w-5 h-5 text-gray-500"
  //               aria-hidden="true"
  //               fill="currentColor"
  //               viewBox="0 0 20 20"
  //               xmlns="http://www.w3.org/2000/svg"
  //             >
  //               <path
  //                 fillRule="evenodd"
  //                 d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
  //                 clipRule="evenodd"
  //               ></path>
  //             </svg>
  //           </div>
  //           <input
  //             type="text"
  //             id="search-navbar"
  //             className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  //             placeholder="Search..."
  //           />
  //         </div>

  //       </div>
  //     </div>
  //   </nav>
  // );

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold">
              Powerhour Generator
            </Link>
          </div>

          {/* Links (Desktop) */}
          <div className="hidden md:flex space-x-6">
            <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
              <li>
                <NavLink
                  to="/"
                  className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/playlists"
                  className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Playlists
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/create"
                  className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Create Playlist
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <Link
                to="/login"
                className="bg-cinnabar-500 hover:bg-cinnabar-600 text-white px-4 py-2 rounded-md"
              >
                Login
              </Link>
            ) : (
              <div className="relative items-center space-x-4 hidden md:flex">
                {/* Profile Icon */}
                <Link to={`/profile/${user.id}`}>
                  <button className="w-8 h-8 rounded-full border-2 border-white overflow-hidden hover:drop-shadow-lg">
                    <img
                      src="https://placehold.co/40"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </button>
                </Link>

                {/* Gear Icon */}
                <button
                  onClick={() => {
                    toggleDropdown();
                  }}
                  className="text-gray-300 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="z-50 absolute right-0 top-12 bg-white text-black rounded-lg shadow-lg w-48">
                    <Link
                      to={"/profile/" + user.id + "/edit"}
                      className="block px-4 py-2 hover:bg-gray-200 rounded-lg"
                    >
                      Edit Profile
                    </Link>
                    <button
                      onClick={() => logout()}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200 rounded-lg"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    menuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-700">
          <Link
            to="/about"
            className="block px-4 py-2 hover:bg-gray-600"
            onClick={() => {
              toggleMenu();
            }}
          >
            About
          </Link>
          <Link
            to="/playlists"
            className="block px-4 py-2 hover:bg-gray-600"
            onClick={() => {
              toggleMenu();
            }}
          >
            Playlists
          </Link>
          {!user ? (
            <Link
              to="/login"
              className="block px-4 py-2 hover:bg-gray-600 text-blue-400"
              onClick={() => {
                toggleMenu();
              }}
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-600"
                onClick={() => {
                  toggleMenu();
                }}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  logout();
                  toggleMenu();
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
