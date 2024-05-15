import React, { useState } from "react";
import axios from "axios";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(false); // Setel emailError kembali ke false saat email berubah
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(false); // Setel passwordError kembali ke false saat password berubah
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword); // Mengubah state showPassword saat tombol ditekan
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `https://shy-cloud-3319.fly.dev/api/v1/auth/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("ApiResponse", response.data);
      const { token } = response.data.data; // Anggap response API mengembalikan token

      if (token) {
        localStorage.setItem("token", token); // Store token in localStorage
        setUser(response.data);
        setError(null);
        setEmailError(false);
        setPasswordError(false);

        // Navigate after 2 seconds
        setTimeout(() => {
          navigate("/", { state: { user: response.data } });
        }, 2000);
      } else {
        // Handle case where token is missing or undefined
        setError("Token Expired Broo");
        setEmailError(true);
        setPasswordError(true);
      }
    } catch (error) {
      // Handle API request error
      console.error("API Request Error:", error);
      setError("Email atau kata sandi tidak valid");
      setEmailError(true);
      setPasswordError(true);
    }
  };

  return (
    <div
      className="bg-gray-600 flex flex-col h-screen items-center justify-center"
      style={{
        backgroundImage: `url('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnJsdmJib2NrZ2VhbjJlbW1pZ2J0bGJnMXhwdThmZzl4MXpsczNxaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2OoE2lLTeDckC7P8I3/giphy-downsized-large.gif')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="text-6xl font-Bebas mb-4 ms-2 text-red-600 hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        ICLIX
      </div>
      <div className="p-32 shadow-2xl bg-stone-950 bg-opacity-25 flex flex-col items-center w-1/3">
        <div className="mb-8">
          <strong className="text-2xl font-bold text-white">Login</strong>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className={`mb-4 rounded-lg p-2 bg-transparent border-2 text-white  ${
              emailError ? "border-red-500" : "border-gray-300"
            } hover:placeholder-white`}
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <br />
          <div className="relative">
            <input
              className={`mb-2 rounded-lg p-2 bg-transparent border-2 text-white ${
                passwordError ? "border-red-500" : "border-gray-300"
              } hover:placeholder-white`}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 bottom-2 px-2 flex items-center"
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <FaEyeSlash className=" text-stone-400" size={20} />
              ) : (
                <IoEyeSharp className=" text-stone-400" size={20} />
              )}
            </button>
          </div>
          <br />
          <button
            type="submit"
            className="font-bold text-xl  rounded-full p-2 w-3/4 ms-6 mb-4 text-white bg-red-500 hover:bg-red-600"
          >
            Submit
          </button>
        </form>
        <GoogleLogin buttonText="Login With Google" />
        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
        )}
        {user && (
          <div className="text-lg text-white font-semibold mt-2">
            Login successful, welcome {user.username}!
          </div>
        )}
        <div className="text-sm font-semibold text-white flex items-center mt-3 ">
          <div className="mr-1">New to Iclix?</div>
          <div
            className="hover:underline hover:cursor-pointer"
            onClick={() => navigate("/Register")}
          >
            Register now.
          </div>
        </div>
      </div>
    </div>
  );
}
