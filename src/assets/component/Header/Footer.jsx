import React from "react";
import { BsInstagram } from "react-icons/bs";
import { FaSpotify } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

function Footer() {
  const data = [
    {
      title: "Instagram",
      link: "https://www.instagram.com/farrelfarhan/",
    },
    {
      title: "Spotify",
      link: "https://open.spotify.com/user/1kfcfp3ltkly8qlyb14reryvg?si=8fe28775e184451e",
    },
    {
      title: "Github",
      link: "https://github.com/Farrelx9",
    },
  ];

  return (
    <div className="object-cover bg-none shadow-2xl py-10  text-white ">
      <div className="flex justify-evenly max-sm:flex-col max-sm:items-center ">
        <div className="text-lg font-semibold hover:cursor-pointer p-4 max-sm:ms-10">
          <div className="py-2"> Movie List</div>
          <div className="py-2"> Now Playing </div>
          <div className="py-2"> Top Rated </div>
          <div className="py-2"> Upcoming</div>
        </div>
        <div className="text-lg p-4 font-semibold hover:cursor-pointer me-32 max-sm:ms-28 ">
          <div className="py-2"> Login </div>
          <div className="py-2"> Register </div>
        </div>
        <div className="flex flex-col gap-4 py-8 ">
          {data.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.title === "Instagram" && (
                <BsInstagram size={35} className=" text-rose-600" />
              )}
              {item.title === "Spotify" && (
                <FaSpotify size={35} className=" text-green-500" />
              )}
              {item.title === "Github" && (
                <FaGithub size={35} className=" text-gray-400" />
              )}
            </a>
          ))}
        </div>
      </div>
      <div className="text-center text-3xl  mt-5 font-Bebas ">
        FEJS @Farrel 2024 | BINAR ACADEMY
      </div>
    </div>
  );
}

export default Footer;
