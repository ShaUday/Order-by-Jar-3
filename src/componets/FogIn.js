import React, { useState } from "react";
import { auth, db } from "../componets/firebase"; // Import auth from firebase.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, setDoc } from "firebase/firestore";

function FogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      // Create a separate document to store user ID (not password)
      const userRef = collection(db, "SignedUpUsersData", uid);
      await setDoc(userRef, { uid }); // Secure storage of user ID

      // Handle successful login (e.g., redirect to protected content)
    } catch (error) {
      setError(error.message);
    }
  };

  // ... rest of your login form component

  return (
    <form onSubmit={handleLogin}>
      <div>
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
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default FogIn;
