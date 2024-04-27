import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import MuiCard from "./MuiCard";
import Cart from "./Cart";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const Shop = () => {
  const [data, setData] = useState([]);
  // const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  // useEffect(() => {
  //   fetch("./spices.JSON")
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data));
  // }, []);
  const handleAddToCart = (product) => {
    console.log("Adding to cart:", product);
    const newCart = [...cart, product];
    setCart(newCart);
    // Implement cart logic here
  };

  return (
    <div>
      <div className=" flex justify-between">
        <div className=" ml-40">
          {/* <h3>Products : {products.length}</h3> */}
          <Grid container spacing={2}>
            {data.map((ele) => (
              <Grid key={ele.id} item lg={12}>
                <MuiCard
                  key={ele.id}
                  data={ele}
                  // child component function name ={ parent component function name}
                  onAddToCart={handleAddToCart}
                ></MuiCard>{" "}
              </Grid>
            ))}
          </Grid>
        </div>
        <div className=" mr-40 border-l-2 border-gray-300 p-10">
          <Cart info={cart}></Cart>
        </div>
      </div>
    </div>
  );
};

export default Shop;
