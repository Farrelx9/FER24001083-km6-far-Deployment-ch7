import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdStarRate } from "react-icons/md";
import NavbarHome from "../assets/component/Header/NavbarHome";
import { useNavigate } from "react-router-dom";

const API_KEY = process.env.API_KEY;

const NowPlaying = () => {
  const [topRated, setTopRated] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchTopRated();
  }, []);

  const fetchTopRated = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
        { headers: { accept: "application/json" } }
      );
      console.log("response.data", response.data);
      setTopRated(response.data.results);
    } catch (error) {
      console.error("Error Fetching Data: ", error);
    }
  };

  //page Top Rated
  return (
    //page Now Playing
    <div className="from-opacity-15 to-opacity-15 bg-gradient-to-t from-opacity-40 to-opacity-40 bg-gray-600 bg-blend-multiply ">
      <NavbarHome />
      <div className="shadow-2xl mx-auto p-8 ">
        <div className="grid grid-cols-5 gap-10 max-sm:grid-cols-2 mt-20">
          {topRated.map((movie) => (
            <div
              key={movie.id}
              className="mx-4"
              onClick={() =>
                navigate(`/DetailMovie/:id=${movie.id}`, {
                  state: { id: movie.id },
                })
              }
            >
              <div className="max-w-xs mx-auto bg-white rounded-lg shadow-lg overflow-hidden hover:scale-90 hover:cursor-pointer">
                <img
                  className="object-cover w-full h-full mb-4 rounded-lg "
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold truncate">
                    {movie.title}
                  </h2>
                  <h2 className="text-gray-700">{movie.release_date}</h2>
                  <p className="text-gray-700 line-clamp-3">{movie.overview}</p>
                  <div className="flex mt-3">
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
    </div>
  );
};
export default NowPlaying;
