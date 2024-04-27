import React, { useEffect, useState } from "react";
import Transition from "./Transition";
import Navbar from "./Navbar";
import { db, auth } from "../componets/firebase";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { Grid } from "@mui/material";
import MuiCard from "./MuiCard";
import { useNavigate } from "react-router-dom";
import { Sensor } from "./Sensor";

const Home = ({ user }) => {
  const navigate = useNavigate();
  const [distance, setDistance] = useState(null); // State to hold the distance

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.thingspeak.com/channels/2472986/feeds.json?api_key=YVUN9HEI6N8CW6TO&results=2"
        );
        const data = await response.json();
        // Assuming the distance is stored in the first feed of the response
        const distanceFromAPI = data.feeds[0]?.field1; // Accessing the 'field1' property of the first feed
        setDistance(distanceFromAPI); // Update the state with the distance
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      // Clean up any ongoing tasks when component unmounts
    };
  }, []); // Empty dependency array to run the effect only once on component mount

  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const valRef = collection(db, "txtData");
        const dataDb = await getDocs(valRef);
        const allData = dataDb.docs.map((val) => ({
          ...val.data(),
          id: val.id,
        }));
        setData(allData);
      } catch (error) {
        console.error("Error getting data:", error);
      }
    };

    getData();

    return () => {
      // Clean up any ongoing tasks when component unmounts
    };
  }, []);

  // Get current user uid
  const uid = auth.currentUser ? auth.currentUser.uid : null;

  const onAddToCart = (product) => {
    if (uid) {
      // Set the quantity of the product
      product.qty = 1;

      // Calculate the total product price
      const totalProductPrice = product.price * product.qty;
      const updatedProduct = {
        ...product,
        TotalProductPrice: totalProductPrice,
      };
      const cartRef = doc(db, uid, product.id);

      setDoc(cartRef, updatedProduct)
        .then(() => {
          console.log("Successfully added to cart");
        })
        .catch((error) => {
          console.error("Error adding product to cart: ", error);
        });
    } else {
      navigate("/login");
    }
  };

  const [datum, setDatum] = useState([]);
  useEffect(() => {
    const unsubscribe = uid
      ? onSnapshot(collection(db, uid), (snapshot) => {
          const newData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setDatum(newData);
        })
      : () => {};

    return () => {
      // Unsubscribe from snapshot listener when component unmounts
      unsubscribe();
    };
  }, [uid]);

  // Calculate total quantity
  const totalQty =
    datum.length > 0
      ? datum.reduce(
          (accumulator, currentValue) => accumulator + currentValue.qty,
          0
        )
      : 0;

  return (
    <div>
      {distance !== null ? <h1>Distance: {distance}</h1> : <h1>Loading...</h1>}
      <Navbar user={user} totalQty={totalQty} />
      <Transition data={data} />
      <Sensor onAddToCart={onAddToCart} allData={data} datum={distance} />
      <Grid container spacing={3}>
        {data.map((ele) => (
          <Grid
            key={ele.id}
            item
            lg={3}
            className=" transform hover:scale-105 transition-all drop-shadow-md"
          >
            <MuiCard
              key={ele.id}
              data={ele}
              // child component function name ={ parent component function name}
              onAddToCart={onAddToCart}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
