import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AuthMe() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getAuthUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found in local storage");
        }

        const response = await axios.get(
          "https://shy-cloud-3319.fly.dev/api/v1/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setUserData(response.data.data);
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user details: ", error);
      }
    };

    getAuthUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div>
      {userData ? (
        <div
          className="bg-gradient-to-t from-gray-800 to-gray-600 h-screen flex flex-col justify-center items-center text-white relative"
          style={{
            backgroundImage: `url('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnJsdmJib2NrZ2VhbjJlbW1pZ2J0bGJnMXhwdThmZzl4MXpsczNxaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2OoE2lLTeDckC7P8I3/giphy-downsized-large.gif')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <button
            className="absolute top-4 left-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate("/")}
          >
            Back
          </button>
          <h2 className="text-3xl text-red-600 font-bold mb-4">User Profile</h2>
          <div className="bg-stone-950 bg-opacity-25 w-1/3 rounded-lg flex flex-col items-center p-20">
            <p className="mb-2">
              <span className="font-bold">Name:</span> {userData.name}
            </p>
            <p className="mb-2">
              <span className="font-bold">Email:</span> {userData.email}
            </p>
            <p className="mb-2">
              <span className="font-bold">Joined:</span> {userData.createdAt}
            </p>
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-black text-center font-bold text text-3xl bg-gradient-to-t from-gray-800 to-gray-600  h-screen">
          Loading ...
        </p>
      )}
    </div>
  );
}
