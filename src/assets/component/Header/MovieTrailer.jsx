import React, { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { IoRemoveOutline } from "react-icons/io5";
import { FaPlayCircle } from "react-icons/fa";

const MovieTrailer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    {
      url: "https://image.tmdb.org/t/p/original/nb3xI8XI3w4pMVZ38VijbsyBqP4.jpg",
      tittle: "Oppenheimer",
      text: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
      trailer:
        "https://www.youtube.com/watch?v=uYPbbksJxIg&pp=ygUTb3BwZW5oZWltZXIgdHJhaWxlcg%3D%3D",
    },
    {
      url: "https://image.tmdb.org/t/p/original/1ZSKH5GGFlM8M32K34GMdaNS2Ew.jpg",
      tittle: "Bob Marley: One Love",
      text: "Jamaican singer-songwriter Bob Marley overcomes adversity to become the most famous reggae musician in the world.",
      trailer:
        "https://www.youtube.com/watch?v=ajw425Kuvtw&pp=ygUWYm9ibWFybGV5IHRyYWlsZXIgZmlsbQ%3D%3D",
    },
    {
      url: "https://image.tmdb.org/t/p/original/kGzFbGhp99zva6oZODW5atUtnqi.jpg",
      tittle: "The Godfather Part II",
      text: "In the continuing saga of the Corleone crime family, a young Vito Corleone grows up in Sicily and in 1910s New York. In the 1950s, Michael Corleone attempts to expand the family business into Las Vegas, Hollywood and Cuba.",
      trailer:
        "https://www.youtube.com/watch?v=9O1Iy9od7-A&pp=ygUXdGhlIGdvZGZhdGhlciAyIHRyYWlsZXI%3D",
    },
  ];

  // handle button trailer hanya muncul untuk film yang saat ini ditampilkan di header
  const watchTrailer = () => {
    window.open(slides[currentIndex].trailer);
  };

  //Next Slide
  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  //Slide Dot
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // handle auto slide per 3 detik
  useEffect(() => {
    const autoSlide = setInterval(() => {
      nextSlide();
    }, 3000);
    //handle clear
    return () => {
      clearInterval(autoSlide);
    };
  }, [currentIndex]);

  return (
    <div className="h-screen w-full relative max-sm:flex-col">
      {/* Image */}
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="h-screen w-full bg-center bg-cover duration-500 absolute top-0 left-0 z-0 "
      ></div>
      {/* Text */}
      <div className="absolute inset-0 flex flex-col items-start justify-center p-48 z-1 ">
        {/* Dot Slide */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center space-x-2 z-2">
          {slides.map((_, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`text-2xl cursor-pointer ${
                slideIndex === currentIndex ? "text-white" : "text-gray-500"
              }`}
            >
              <IoRemoveOutline size={50} />
            </div>
          ))}
        </div>
        {/* Tittle */}
        <h1 className="text-white text-6xl font-bold w-[60%]">
          {slides[currentIndex].tittle}
        </h1>
        {/* Overview Text */}
        <span className="text-white text-xl mt-6 w-[40%]">
          "{slides[currentIndex].text}"
        </span>
        {/* Button Watch Trailer */}
        <button
          className="flex items-center gap-2 px-2 py-2 bg-red-500 text-white rounded-full mt-8 border border-1 hover:bg-red-600"
          onClick={watchTrailer}
        >
          <FaPlayCircle size={30} />
          WATCH TRAILER
        </button>
      </div>
    </div>
  );
};

export default MovieTrailer;
