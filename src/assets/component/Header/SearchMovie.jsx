import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdStarRate } from "react-icons/md";


const API_KEY = process.env.API_KEY;

const SearchMovie = () => {
  // const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(process?.env.API_KEY);

  const searchMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${location.state.query}&api_key=${API_KEY}&include_adult=false&language=en-US&page=1&year=2021&region=EN`,
        { headers: { accept: "application/json" } }
      );
      console.log("response.data", response.data);
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error Fetching Data: ", error);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      if (location.state.query.trim().length > 2) {
        searchMovies();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [location.state.query]);

  return (
    <div className="">
      <div className="flex justify-center mb-10">
        <strong className="text-4xl font-sans text-black ">
          Search Result
        </strong>
      </div>
      <div className=" grid grid-cols-4 gap-10">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className=" mx-4 "
            onClick={() =>
              navigate(`/DetailMovie/:id=${movie.id}`, {
                state: { id: movie.id },
              })
            }
          >
            <div className="hover:cursor-pointer hover:scale-90">
              <img
                className="object-cover w-64 h-full mb-4 rounded-lg "
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="p-4 ">
                <h2 className="text-white ">{movie.title}</h2>
                <p className="text-white line-clamp-3">{movie.overview}</p>
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
                          index < movie.vote_average / 2 ? "yellow" : "black"
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
    </div>
  );
};

export default SearchMovie;
