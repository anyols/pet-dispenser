import React, { useState } from "react";
import logo from "../assets/logo.webp";
import Navbar from "./navbar";
import Functionality from "./functionality";

const Modal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
      <div className="bg-white p-8 rounded-md text-center">
        <p className="text-[#b91c1c]">Incorrect username or password</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 text-black rounded-md text-2xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

const Login = () => {
  // Accepted users
  const users = {
    nil: "12345",
    gerard: "54321",
    mateo: "67890",
    arnau: "09876",
  };

  // state to manage incorrect input
  const [modalOpen, setModalOpen] = useState(false);

  // state to manage the login
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // State to manage input values
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Update the corresponding input field in the state as the user types
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle login button click
  const handleLogin = () => {
    if (
      formData["username"] != "" &&
      formData["password"] != "" &&
      Object.keys(users).includes(formData["username"]) &&
      users[formData["username"]] == formData["password"]
    ) {
      // Display inside page
      setIsLoggedIn(true);
    } else {
      // incorrect user or password
      setModalOpen(true);
      //  clear form
      setFormData({
        username: "",
        password: "",
      });
    }
  };

  return (
    <div>
      {!isLoggedIn && (
        <div className="flex items-center justify-center h-screen bg-white">
          <div className="bg-white p-8 border border-gray-300 rounded shadow-md">
            <div className="flex justify-between">
              <h2 className="text-2xl font-semibold mb-4 text-black">Login</h2>
              <img src={logo} alt="logo" className="w-12 h-12 object-contain" />
            </div>
            <form className="flex flex-col">
              <label htmlFor="username" className="mb-2 text-black">
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="p-2 mb-4 border rounded bg-[#cbd5e1] text-[#475569] text-xs"
              />

              <label htmlFor="password" className="mb-2 text-black">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="p-2 mb-4 border rounded bg-[#cbd5e1] text-[#475569] text-xs"
              />

              <button
                type="button" // Change to "submit" if you want to submit the form
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                onClick={handleLogin}
              >
                Login
              </button>
            </form>
          </div>
          {modalOpen && <Modal onClose={handleCloseModal} />}
        </div>
      )}
      {isLoggedIn && (
        <div>
          <Navbar />
          <Functionality />
        </div>
      )}
    </div>
  );
};

export default Login;
