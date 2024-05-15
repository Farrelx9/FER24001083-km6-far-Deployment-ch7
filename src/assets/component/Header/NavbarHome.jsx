import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaStar } from "react-icons/fa";
import { useRef } from "react";
import { MdAccountCircle } from "react-icons/md";

function NavbarHome() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Status login
  const inputRef = useRef();

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length > 2) {
      navigate("/src", { state: { query: e.target.value } });
    }
  };

  useEffect(() => {
    // Memeriksa status token saat komponen dimuat
    const checkTokenStatus = () => {
      const token = localStorage.getItem("token"); // Misalnya Anda menyimpan token di localStorage
      setIsLoggedIn(!!token); // Mengubah status login berdasarkan keberadaan token
    };

    checkTokenStatus(); // Memeriksa status token saat komponen dimuat
  }, []);
  const handleSelectChange = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption === "Popular") {
      navigate("/Popular");
    }
    if (selectedOption === "Now Playing") {
      navigate("/NowPlaying");
    }
    if (selectedOption === "Top Rated") {
      navigate("/TopRated");
    }
    if (selectedOption === "Up Coming") {
      navigate("/UpComing");
    }
    // dapat menambahkan logika untuk rute lain di sini
  };

  const clickForFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div className="flex justify-between mb-10 object-cover fixed z-40 w-full bg-black bg-opacity-60">
      <div
        className="text-5xl font-Bebas ms-8 mt-4 text-red-600 hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        ICLIX
      </div>
      <form className="flex items-center ">
        <input
          className=" rounded-lg p-2 ms-64 bg-transparent text-white font-bold hover:cursor-pointer mt-2 "
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleInputChange}
          ref={inputRef}
        />
        <FaSearch
          className="ml-2 mt-2 text-white "
          size={25}
          onClick={clickForFocus}
        />
      </form>
      <div className="flex font-bold gap-4 p-2 mx-4 text-white max-sm:hidden">
        {!isLoggedIn ? (
          <>
            <button
              className="text-lg rounded-full p-3 bg-transparent hover:text-red-600"
              onClick={() => navigate("/Login")}
            >
              Login
            </button>
            <button
              className="text-lg rounded-full p-3 bg-transparent hover:text-red-600"
              onClick={() => navigate("/Register")}
            >
              Register
            </button>
          </>
        ) : (
          <div className="relative flex items-center ">
            <button
              className="mt-1 me-8 "
              onClick={() => navigate("/Favorites")}
            >
              <FaStar size={25} />
            </button>
            <button className="mt-1 me-8  hover:scale-110" onClick={() => navigate("/Auth-me")}>
              <MdAccountCircle size={30} />
            </button>
            <form>
              <select
                id="Movie List"
                className="text-lg bg-opacity-0 bg-transparent rounded-lg p-3 mx-auto text-yellow-500"
                onChange={handleSelectChange}
              >
                <option value="Recomendation">Recomendation</option>
                <option value="Now Playing">Now Playing</option>
                <option value="Popular">Movie Popular</option>
                <option value="Top Rated">Top Rated</option>
                <option value="Up Coming">Up Coming</option>
              </select>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavbarHome;
