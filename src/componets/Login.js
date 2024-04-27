import React, { useState, useEffect } from "react";
import { auth } from "../componets/firebase";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Cleanup function to clear state when unmounting
    return () => {
      setEmail("");
      setPassword("");
      setDisplayName("");
      setError("");
    };
  }, []); // Empty dependency array means this effect runs only once on mount

  const login = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: displayName });

      const user = userCredential.user;
      console.log("Logged in user:", user);

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
        navigate("/");
      }, 2000);

      // Redirect to home page immediately
      // Commenting this line out as it seems redundant
      // navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form autoComplete="off" className="space-y-4" onSubmit={login}>
        <div>
          <div>
            <label
              htmlFor="displayName"
              className="block text-gray-700 font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="displayName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              onChange={(e) => setDisplayName(e.target.value)}
              value={displayName}
            />
          </div>

          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            LOGIN
          </button>
          <ToastContainer></ToastContainer>
        </div>
        {error && <span className="text-red-500 text-xs italic">{error}</span>}
        <div className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signin" className="text-blue-500 underline">
            Register Here
          </Link>
        </div>
      </form>
    </div>
  );
};
