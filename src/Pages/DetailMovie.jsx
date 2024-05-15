import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarHome from "../assets/component/Header/NavbarHome";
import { MdStarRate } from "react-icons/md";
const API_KEY = process.env.API_KEY;

export default function MovieDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  const [watchLaterList, setWatchLaterList] = useState([]);

  const fetchMovieDetail = async () => {
    if (!location.state || !location.state.id) {
      return;
    }
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${location.state.id}?language=en-US&api_key=${API_KEY}`,
        { headers: { accept: "application/json" } }
      );
      console.log("response.detail ", response.data);
      setDetail(response.data);
    } catch (error) {
      console.error("Error fetching movie detail: ", error);
    }
  };
  const addToWatchLater = (movie) => {
    const updatedWatchLaterList = [...watchLaterList, movie];
    setWatchLaterList(updatedWatchLaterList);
    alert("Movie added to watch later");
    localStorage.setItem(
      "watchLaterList",
      JSON.stringify(updatedWatchLaterList)
    );
  };

  useEffect(() => {
    fetchMovieDetail();
    const storedWatchLaterList =
      JSON.parse(localStorage.getItem("watchLaterList")) || [];
    setWatchLaterList(storedWatchLaterList);
  }, []);

  return (
    <div className="from-opacity-15 to-opacity-15 bg-gradient-to-t from-opacity-40 to-opacity-40 bg-gray-600 bg-blend-multiply w-screen h-screen">
      <NavbarHome />
      <div key={detail?.id}>
        <div className="relative">
          <img
            src={`https://image.tmdb.org/t/p/original/${detail?.backdrop_path}`}
            alt={detail?.title}
            className=" w-screen h-screen"
            onClick={() =>
              navigate("/src", { state: { query: location.state.query } })
            }
          />
          <div className="absolute bottom-1/2 left-36 text-start text-white h-64 p-6 flex flex-col gap-6 hover:text-green-300 ">
            <h2 className="text-6xl font-bold ">{detail?.title}</h2>
            <div className="flex flex-wrap gap-2">
              {detail?.genres.map((genre, index) => (
                <h2 key={genre.id} className="font-semibold text-xl ">
                  {genre.name}
                  {index < detail?.genres.length - 1 && ", "}
                </h2>
              ))}
            </div>
            <h2 className="font-semibold text-2xl">{detail?.release_date}</h2>
            <p className="font-semibold w-[40%] text-xl">{detail?.overview}</p>
            <div className="flex py-1 ">
              <MdStarRate size="40px" className="py-1 mr-6 text-yellow-300" />
              <span className="text-2xl font-bold py-1 ">
                {detail?.vote_average.toFixed(1)} / 10
              </span>
            </div>
            <button
              onClick={() => addToWatchLater(detail)}
              className="mt-4 px-4 py-2 w-[200px] bg-blue-500 text-lg text-white rounded hover:scale-105"
            >
              Add to Watch Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
