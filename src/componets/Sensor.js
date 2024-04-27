import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../componets/firebase";
import { GiClothJar } from "react-icons/gi";

// or via CommonJS

export const Sensor = ({ datum, onAddToCart }) => {
  const getDataById = async (id) => {
    const valRef = doc(db, "txtData", id); // Assuming "txtData" is a collection and id is the document ID
    const docSnap = await getDoc(valRef);
    if (docSnap.exists()) {
      const data = { ...docSnap.data(), id: docSnap.id };
      return data;
    } else {
      return null; // Document with the provided ID does not exist
    }
  };
  const [globalData, setGlobalData] = useState([]);
  // Example usage
  const fetchSpecificData = async (id) => {
    const data = await getDataById(id);
    if (data) {
      // console.log("Data found:", data);
      setGlobalData(data);
      // Do something with the data
    } else {
      console.log("Data not found.");
    }
  };

  // Call this function with the specific ID you want to fetch
  fetchSpecificData("zL3WcwtWj6WXNmUVLXiq");
  const Swal = require("sweetalert2");
  const handleAddToCart = () => {
    onAddToCart(globalData);
    Swal.fire({
      title: "Success",
      text: "Added To Cart",
      icon: "success",
      confirmButtonText: "Okay",
    });
  };
  console.log("Jar data", datum);
  return (
    <div className="">
      {datum > 11 ? (
        <div>
          <div
            className=" border border-4 rounded flex justify-between p-5 rounded-2xl transform hover:scale-105 transition-all drop-shadow-md  ml-5 mr-5
        bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-t from-purple-700 to-pink-700 text-white font-bold py-2 px-4 rounded "
          >
            <h1 className=" text-2xl font-semibold italic hover:not-italic">
              Jar is empty
            </h1>
            <div className="">
              <GiClothJar className=" h-10 w-10"></GiClothJar>
            </div>
            <div>
              <button
                className=" border border-2 p-2 border-white rounded-md"
                onClick={handleAddToCart}
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      ) : datum > 6 ? (
        <div
          className=" border border-4 rounded flex justify-between p-5 rounded-2xl transform hover:scale-105 transition-all drop-shadow-md  ml-5 mr-5
        bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-t from-purple-700 to-pink-700 text-white font-bold py-2 px-4 rounded "
        >
          <h1 className=" text-2xl font-semibold italic hover:not-italic">
            Jar is half empty
          </h1>
        </div>
      ) : datum > 1 ? (
        <div
          className=" border border-4 rounded flex justify-between p-5 rounded-2xl transform hover:scale-105 transition-all drop-shadow-md  ml-5 mr-5
        bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-t from-purple-700 to-pink-700 text-white font-bold py-2 px-4 rounded "
        >
          <h1 className=" text-2xl font-semibold italic hover:not-italic">
            Jar is half empty
          </h1>
        </div>
      ) : (
        <div
          className=" border border-4 rounded flex justify-between p-5 rounded-2xl transform hover:scale-105 transition-all drop-shadow-md  ml-5 mr-5
        bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-t from-purple-700 to-pink-700 text-white font-bold py-2 px-4 rounded "
        >
          <h1 className=" text-2xl font-semibold italic hover:not-italic">
            Jar is half empty
          </h1>
        </div>
      )}
    </div>
  );
};
