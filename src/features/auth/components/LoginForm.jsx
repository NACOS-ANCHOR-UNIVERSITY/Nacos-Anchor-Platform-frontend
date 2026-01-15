import React from "react";
import {useUserStore} from "../../../store/useUserStore";
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
  const login = useUserStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = (role) => {
    // SIMULATE A LOGIN (Since backend isn't connected yet)
    login(
      {name: "Test User", matric: "19/1234", role: role}, // User Data
      "fake-jwt-token" // Token
    );

    // Redirect based on role
    if (role === "student") navigate("/student/dashboard");
    else navigate("/admin/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-4">
      <h1 className="text-2xl font-bold">NACOS Portal Login</h1>
      <p className="text-gray-500">Select a role to test the dashboard:</p>

      <div className="flex gap-4">
        <button
          onClick={() => handleLogin("student")}
          className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
        >
          Login as Student
        </button>

        <button
          onClick={() => handleLogin("admin")}
          className="bg-red-600 text-white px-6 py-2 rounded shadow hover:bg-red-700"
        >
          Login as Admin
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
