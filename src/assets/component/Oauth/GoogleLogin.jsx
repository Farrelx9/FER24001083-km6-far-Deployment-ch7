import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function GoogleLogin({ buttonText }) {
  const navigate = useNavigate();

  const registerLoginWithGoogleAction = async (accessToken) => {
    try {
      const response = await axios.post(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/google",
        { access_token: accessToken },
        { headers: { "Content-Type": "application/json" } }
      );
      const { token } = response.data.data;
      localStorage.setItem("token", token);
      navigate("/", { state: { token: token } });
    } catch (error) {
      console.error("Error registering/login with Google:", error);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) => {
      localStorage.setItem("login", "google function");
      registerLoginWithGoogleAction(responseGoogle.access_token);
    },
    onError: (error) => {
      console.error("Google login error:", error);
    },
  });

  return (
    <button
      variant="primary"
      onClick={() => loginWithGoogle()}
      className="border-1 p-4 font-medium w-46 bg-white opacity-90 flex rounded-lg mt-1 hover:bg-slate-200 hover:shadow-lg hover:scale-105 transform transition-all duration-200"
    >
      <FcGoogle className="w-6 h-6 mr-2" />
      {buttonText}
    </button>
  );
}

export default GoogleLogin;
