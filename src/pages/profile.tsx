import { useState, useEffect } from "react";
import { useUser } from "../services/user";
import { useParams } from "react-router-dom";
import CreatedPlaylists from "../components/createdplaylists";
import {
  ProfileRootType,
  ProfileType,
  CreatedType,
  BookmarkedType,
  LikedType,
} from "../types/profile.type";
import { create } from "domain";
export default function Profile() {
  const { user, logout } = useUser();
  const [createdPlaylists, setCreatedPlaylists] = useState<CreatedType[]>();
  const [likedPlaylists, setLikedPlaylists] = useState<LikedType[]>();
  const [bookmarkedPlaylists, setBookmarkedPlaylists] =
    useState<BookmarkedType[]>();
  const [profileInfo, setProfileInfo] = useState<ProfileType>();
  const { id } = useParams();

  const getplaylists = async () => {
    const token = localStorage.getItem("token");
    try {
      let response = await fetch(`http://localhost:3333/profile/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const responseJson = await response.json();
        if (responseJson) {
          setCreatedPlaylists(responseJson.created);
          setProfileInfo(responseJson.profile[0]);
          setLikedPlaylists(responseJson.liked);
          setBookmarkedPlaylists(responseJson.bookmarked);
        }
      }
    } catch (e) {}
  };
  useEffect(() => {
    getplaylists();
  }, []);
  return (
    <section className="pt-16 bg-blueGray-50">
      <div className="w-full lg:w-3/4 px-4 mx-auto">
        <div className="relative flex flex-col min-w-0 break-words text-white w-full mb-6 shadow-xl rounded-lg mt-16">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div>
                <h1> {profileInfo?.username}</h1>
              </div>
              <div className="w-full px-4 text-center mt-20">
                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      {createdPlaylists ? createdPlaylists.length : 0}
                    </span>
                    <span className="text-sm text-blueGray-400">Created</span>
                  </div>
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      {likedPlaylists ? likedPlaylists.length : 0}
                    </span>
                    <span className="text-sm text-blueGray-400">Liked</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 grid-rows-1 gap-3">
              <div className="">
                {createdPlaylists && (
                  <CreatedPlaylists
                    title="Created Playlists"
                    playlists={createdPlaylists}
                  />
                )}
              </div>
              <div>
                {likedPlaylists && (
                  <CreatedPlaylists
                    title="Liked Playlists"
                    playlists={likedPlaylists}
                  />
                )}
              </div>
              <div>
                {bookmarkedPlaylists && (
                  <CreatedPlaylists
                    title="Bookmarked Playlists"
                    playlists={bookmarkedPlaylists}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
