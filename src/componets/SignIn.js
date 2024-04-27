import React, { useState } from "react";
import { auth, db } from "../componets/firebase";
import { Link, useNavigate } from "react-router-dom"; // Changed to useNavigate
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SignIn = (props) => {
  const navigate = useNavigate(); // Changed to useNavigate
  // defining state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Signup function
  const signup = async (e) => {
    e.preventDefault();

    try {
      // Create user with Firebase Authentication
      createUserWithEmailAndPassword(auth, email, password);

      // Create a new document in the "SignedUpUsersData" collection (excluding password)
      const usersRef = collection(db, "signed");
      addDoc(usersRef, {
        name,
        email,
        password,
      });

      // Clear form fields and error message
      setName("");
      setEmail("");
      setPassword("");
      setError("");
      // Call notify function to show success notification
      const notify = () => {
        toast.success("Login is Succesfull!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      };

      // Call notify function to show success notification
      notify();

      setTimeout(() => {
        // Redirect to home page after 5 seconds
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-xl font-bold text-center mb-8">Sign up</h2>
      <form autoComplete="off" className="space-y-4" onSubmit={signup}>
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
        >
          SUBMIT
        </button>
        <ToastContainer></ToastContainer>
      </form>
      {error && <span className="text-red-500 text-sm">{error}</span>}
      <br />
      <span className="text-sm">
        Already have an account? Login
        <Link to="/login" className="text-blue-500 underline">
          {" "}
          Here
        </Link>
      </span>
    </div>
  );
};
