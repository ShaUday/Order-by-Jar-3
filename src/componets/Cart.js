import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { db, auth } from "../componets/firebase";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { IndividualCartProduct } from "./IndividualCartProduct";
import { Grid } from "@mui/material";

import Box from "@mui/material/Box";
import { Modal } from "./Modal";
export const Cart = ({ user }) => {
  const [uid, setUid] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (uid) {
      const unsubscribe = onSnapshot(collection(db, uid), (snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setData(newData);
      });
      return () => unsubscribe();
    } else {
      setData([]);
    }
  }, [uid]);

  const updateProduct = async (cartProduct, updatedFields) => {
    const cartRef = doc(db, uid, cartProduct.id);
    try {
      await updateDoc(cartRef, updatedFields);
      console.log("Product updated successfully");
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  const cartProductIncrease = (cartProduct) => {
    const updatedQty = cartProduct.qty + 1;
    const updatedTotalProductPrice = updatedQty * cartProduct.price;
    updateProduct(cartProduct, {
      qty: updatedQty,
      TotalProductPrice: updatedTotalProductPrice,
    });
  };

  const cartProductDecrease = (cartProduct) => {
    if (cartProduct.qty > 1) {
      const updatedQty = cartProduct.qty - 1;
      const updatedTotalProductPrice = updatedQty * cartProduct.price;
      updateProduct(cartProduct, {
        qty: updatedQty,
        TotalProductPrice: updatedTotalProductPrice,
      });
    }
  };
  // console.log(data.length);
  const qty = data.map((cartProcuts) => {
    return cartProcuts.qty;
  });
  // reducing the qty in a single value
  const reducerOfQty = (accumulator, currentValue) =>
    accumulator + currentValue;

  const totalQty = qty.reduce(reducerOfQty, 0);

  // console.log(totalQty);
  const price = data.map((cartProduct) => {
    return cartProduct.TotalProductPrice;
  });

  // reducing the price in a single value
  const reducerOfPrice = (accumulator, currentValue) =>
    accumulator + currentValue;

  const totalPrice = price.reduce(reducerOfPrice, 0);
  // show modal state
  const [showModal, setShowModal] = useState(false);
  // trigger modal
  const triggerModal = () => {
    setShowModal(true);
  };
  // hide model
  const hideModal = () => {
    setShowModal(false);
  };
  return (
    <div>
      <Navbar user={user} totalQty={totalQty}></Navbar>
      <br />
      {data.length > 0 ? (
        <Grid container spacing={2}>
          {data.map((ele) => (
            <Grid
              key={ele.id}
              item
              lg={4}
              className="transform hover:scale-105 transition-all drop-shadow-md"
            >
              <IndividualCartProduct
                key={ele.id}
                data={ele}
                cartProductIncrease={cartProductIncrease}
                cartProductDecrease={cartProductDecrease}
                uid={uid}
              ></IndividualCartProduct>{" "}
            </Grid>
          ))}
        </Grid>
      ) : (
        <div>
          <h2 className=" text-center text-2xl">No Products to Show!</h2>
        </div>
      )}
      <div className=" flex justify-center">
        <Box
          height={200}
          width={250}
          my={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={4}
          p={2}
          sx={{ border: "2px solid grey" }}
        >
          <div>
            <h5>Cart Summary</h5>
            <br></br>
            <div>
              Total No of Products: <span>{totalQty}</span>
            </div>
            <div>
              Total Price to Pay: <span>$ {totalPrice}</span>
            </div>
            <br></br>
            <button
              className="btn btn-secondary btn-md"
              onClick={() => triggerModal()}
            >
              Cash on Delivery
            </button>
          </div>
        </Box>
      </div>
      {showModal === true && (
        <Modal
          totalPrice={totalPrice}
          totalQty={totalQty}
          hideModal={hideModal}
        ></Modal>
      )}
    </div>
  );
};
