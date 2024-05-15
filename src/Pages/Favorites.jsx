import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarHome from "../assets/component/Header/NavbarHome";
import { MdStarRate } from "react-icons/md";

export default function Favorites() {
  const [watchLaterList, setWatchLaterList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedWatchLaterList =
      JSON.parse(localStorage.getItem("watchLaterList")) || [];
    setWatchLaterList(storedWatchLaterList);
  }, []);

  const deleteAllMovies = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all movies?"
    );

    if (confirmDelete) {
      setWatchLaterList([]);
      localStorage.setItem("watchLaterList", JSON.stringify([]));
    }
  };

  const deleteMovie = (movieId) => {
    const updatedWatchLaterList = watchLaterList.filter(
      (movie) => movie.id !== movieId
    );
    setWatchLaterList(updatedWatchLaterList);
    localStorage.setItem(
      "watchLaterList",
      JSON.stringify(updatedWatchLaterList)
    );
  };

  return (
    <div className="from-opacity-15 to-opacity-15 bg-gradient-to-t from-opacity-40 to-opacity-40 bg-gray-600 bg-blend-multiply min-h-screen">
      <NavbarHome />
      <div className="container mx-auto p-8">
        <h1 className="text-4xl text-white font-bold mb-6 mt-10 text-center">
          Watch Later List
        </h1>
        {watchLaterList.length > 0 && (
          <button
            onClick={deleteAllMovies}
            className="mb-6 px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete All
          </button>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {watchLaterList.length > 0 ? (
            watchLaterList.map((favorites) => (
              <div
                key={favorites.id.toString()}
                className="cursor-pointer transform hover:scale-90 transition duration-300"
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img
                    className="object-cover w-full h-56"
                    src={`https://image.tmdb.org/t/p/w500/${favorites.poster_path}`}
                    alt={favorites.title}
                    onClick={() =>
                      navigate(`/DetailMovie/${favorites.id}`, {
                        state: { id: favorites.id },
                      })
                    }
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold truncate">
                      {favorites.title}
                    </h2>
                    <h2 className="text-gray-700">{favorites.release_date}</h2>
                    <p className="text-gray-700 line-clamp-3">
                      {favorites.overview}
                    </p>
                    <div className="flex items-center mt-3">
                      <span className="text-sm font-bold bg-orange-100 inline-block px-2 py-1 rounded-full">
                        {favorites.vote_average}
                      </span>
                      <div className="flex text-black ml-2">
                        {[...Array(5)].map((_, index) => (
                          <MdStarRate
                            key={index}
                            size="20px"
                            color={
                              index < favorites.vote_average / 2
                                ? "yellow"
                                : "gray"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteMovie(favorites.id)}
                      className="mt-3 px-4 py-2 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="absolute inset-0 flex justify-center items-center text-white text-xl">
              No movies in your watch later list.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
