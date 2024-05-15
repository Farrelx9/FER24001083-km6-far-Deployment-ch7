import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./assets/component/Oauth/Login";
import Register from "./assets/component/Oauth/Register";
import SearchResult from "./Pages/SearchResult";
import DetailMovie from "./Pages/DetailMovie";
import UpComingMain from "./Pages/UpcomingMain";
import TopRatedMain from "./Pages/TopRatedMain";
import NowPlaying from "./Pages/NowPlayingMain";
import MoviePopularMain from "./Pages/MoviePopularMain";
import AuthMe from "./assets/component/Oauth/AuthMe";
import Favorites from "./Pages/Favorites";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Auth-me" element={<AuthMe />} />
        <Route path="/src" element={<SearchResult />} />
        <Route path="/DetailMovie/:id" element={<DetailMovie />} />
        <Route path="/UpComing" element={<UpComingMain />} />
        <Route path="/TopRated" element={<TopRatedMain />} />
        <Route path="/NowPlaying" element={<NowPlaying />} />
        <Route path="/Popular" element={<MoviePopularMain />} />
        <Route path="/Favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}
