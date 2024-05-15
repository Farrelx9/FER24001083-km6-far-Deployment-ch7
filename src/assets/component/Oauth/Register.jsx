import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError(false); // Reset username error state
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(false); // Reset email error state
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(false); // Reset password error state
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset any previous error states
    setError(null);
    setUsernameError(false);
    setEmailError(false);
    setPasswordError(false);

    // Validation
    if (!username) {
      setUsernameError(true);
      setError("Username cannot be empty");
      return;
    }

    if (!email) {
      setEmailError(true);
      setError("Email cannot be empty");
      return;
    }

    if (!password) {
      setPasswordError(true);
      setError("Password cannot be empty");
      return;
    }

    try {
      const response = await axios.post(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/register",
        {
          email: email,
          name: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        const token = response.data.data.token;
        localStorage.setItem("token", token);
        // Registration successful
        setRegistrationSuccess(true); // Set registration success state
      }
    } catch (error) {
      console.error("Error object:", error);

      if (error.response) {
        console.log("Server response data:", error.response.data);

        if (error.response.data.message === "User has already registered") {
          setError(
            "Registration failed: The email you entered is already registered. Please use a different email."
          );
        } else {
          setError(
            "Registration failed: Invalid request. Please ensure the data you entered is correct."
          );
        }
      } else {
        setError("Registration failed: Server error occurred.");
      }
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
          <strong className="text-2xl font-bold text-white">Register</strong>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <input
            className={`mb-4 rounded-lg p-2 bg-transparent border-2 text-white ${
              usernameError ? "border-red-500" : "border-gray-300"
            }`}
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
          <input
            className={`mb-4 rounded-lg p-2 bg-transparent border-2 text-white ${
              emailError ? "border-red-500" : "border-gray-300"
            }`}
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            className={`mb-4 rounded-lg p-2 bg-transparent border-2 text-white ${
              passwordError ? "border-red-500" : "border-gray-300"
            }`}
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button
            onClick={handleSubmit}
            type="submit"
            className="font-bold text-xl rounded-full p-2 w-[38%] text-white bg-red-500 hover:bg-red-600"
          >
            Submit
          </button>
        </form>
        {error && <div className="text-red-500 mt-4">{error}</div>}
        {registrationSuccess && (
          <div className="text-lg text-white mt-4">
            Registration successful!
          </div>
        )}
        <div className="text-sm font-semibold text-white flex items-center mt-3 ">
          <div className="mr-1">Already have an account?</div>
          <div
            className="hover:underline hover:cursor-pointer"
            onClick={() => navigate("/Login")}
          >
            Login here.
          </div>
        </div>
      </div>
    </div>
  );
}
