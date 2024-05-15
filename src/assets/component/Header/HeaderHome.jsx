import React, { useState } from "react";
import NavbarHome from "./NavbarHome";
import MoviePopular from "../Movie/MoviePopular";
import NowPlaying from "../Movie/NowPlaying";
import TopRated from "../Movie/TopRated";
import UpComing from "../Movie/UpComing";
import MovieTrailer from "../Header/MovieTrailer";

function HeaderHome() {
  return (
    <div>
      <NavbarHome />
      <MovieTrailer />
      <div className="text-3xl text-center font-bold text-white mb-5 mt-16">
        RECOMMENDATION
      </div>
      <MoviePopular />
      <NowPlaying />
      <TopRated />
      <UpComing />
    </div>
  );
}

export default HeaderHome;
