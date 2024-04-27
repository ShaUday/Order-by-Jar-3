import Home from "./componets/Home";
import { Routes, Route } from "react-router-dom";
import StoreImageTextFirebase from "./componets/StoreImageTextFirebase.js";
import { Login } from "./componets/Login.js";
import { SignIn } from "./componets/SignIn.js";
import { Cart } from "./componets/Cart.js";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./componets/firebase.js";

function App() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user.displayName);
      } else {
        setAuthUser(null);
      }
    });

    // Clean up the listener when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home user={authUser} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/cart" element={<Cart user={authUser} />} />
        <Route path="/addProducts" element={<StoreImageTextFirebase />} />
      </Routes>
    </div>
  );
}

export default App;
