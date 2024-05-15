import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdStarRate } from "react-icons/md";
import { HiDocumentSearch } from "react-icons/hi";
import NavbarHome from "../assets/component/Header/NavbarHome";
import gabisa from "../assets/logo/gabisa.jpeg";

const API_KEY = process.env.API_KEY;

const SearchMovie = () => {
  const [movies, setMovies] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const searchMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${location?.state?.query}&api_key=${API_KEY}&include_adult=false&language=en-US&page=1&year=2021&region=EN`,
        { headers: { accept: "application/json" } }
      );
      console.log("response.data", response.data);
      const searchResults = response.data.results;
      if (searchResults.length === 0) {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
        setMovies(searchResults);
      }
    } catch (error) {
      console.error("Error Fetching Data: ", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (location?.state?.query.trim().length > 2) {
        searchMovies();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [location?.state?.query]);

  return (
    <div className="from-opacity-15 to-opacity-15 bg-gradient-to-t from-opacity-40 to-opacity-40 bg-gray-600 bg-blend-multiply h-fit">
      <NavbarHome />
      <div className="flex justify-center mb-10">
        <strong className="text-4xl font-sans text-black mt-20 me-20 ">
          Search Result for "{location?.state?.query}"
        </strong>
      </div>
      {isEmpty ? (
        <div className="flex justify-center mt-80 text-4xl font-bold me-10  gap-4 h-screen">
          <HiDocumentSearch className="text-yellow-500" />
          NO MOVIES FOUND
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-10 shadow-2xl">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="mx-4"
              onClick={() =>
                navigate(`/DetailMovie/:id=${movie.id}`, {
                  state: { id: movie.id, query: location.state.query },
                })
              }
            >
              <div className="hover:cursor-pointer hover:scale-90 flex flex-col items-center ">
                <img
                  className="object-cover w-64 h-[384px] mb-4 rounded-lg "
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : gabisa
                  }
                  alt={movie.title}
                />
                <div className="p-4 w-64 h-[256px] ">
                  <h2 className="text-white mb-2 font-bold text-xl hover:text-green-200">
                    {movie.title}
                  </h2>
                  <p className="text-white text-lg">{movie.release_date}</p>
                  <div className="flex mt-2 gap-1">
                    <span className="text-sm font-bold bg-orange-100 inline-block px-2 py-1 rounded-full">
                      {movie.vote_average}
                    </span>
                    <div className="flex text-black py-1">
                      {[...Array(5)].map((_, index) => (
                        <MdStarRate
                          key={index}
                          size="20px"
                          color={
                            index < movie.vote_average / 2 ? "yellow" : "gray"
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchMovie;
