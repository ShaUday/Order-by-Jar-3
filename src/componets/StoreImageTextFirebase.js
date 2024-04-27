import React, { useEffect, useState } from "react";
import { db, storage } from "../componets/firebase";
import { v4 } from "uuid";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";

function StoreImageTextFirebase() {
  const [Pname, setName] = useState("");
  const [price, setPrice] = useState("");
  const [ratting, setRatting] = useState("");
  const [seller, setSeller] = useState("");
  const [img, setImg] = useState("");
  const [data, setData] = useState([]);

  // Cleanup function for uploaded file reference
  useEffect(() => {
    return () => {
      if (img) {
        // Delete the temporary file reference when component unmounts
        const imgRef = storageRef(storage, img);
        imgRef.delete().catch((error) => {
          console.error("Error deleting file:", error);
        });
      }
    };
  }, [img]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imgRef = storageRef(storage, `Imgs/${v4()}`);
    uploadBytes(imgRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImg(url);
      });
    });
  };

  const handleClick = async () => {
    if (!Pname || !price || !seller || !ratting || !img) {
      alert("Please fill in all fields");
      return;
    }

    const valRef = collection(db, "txtData");
    await addDoc(valRef, {
      name: Pname,
      img: img,
      price: price,
      seller: seller,
      ratting: ratting,
    });
    alert("Data added successfully");
  };

  const getData = async () => {
    const valRef = collection(db, "txtData");
    const dataDb = await getDocs(valRef);
    const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
    setData(allData);
  };

  useEffect(() => {
    getData();
    // Clean up data fetching subscription when unmounting
    return () => {
      setData([]);
    };
  }, []);

  return (
    <div>
      <input
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter product name"
      />
      <br />
      <input
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter product Price"
      />
      <br />
      <input
        onChange={(e) => setSeller(e.target.value)}
        placeholder="Enter seller"
      />
      <br />
      <input
        type="number"
        onChange={(e) => setRatting(e.target.value)}
        placeholder="Enter ratting"
      />
      <br />
      <input type="file" onChange={(e) => handleUpload(e)} />
      <br />
      <br />
      <button onClick={handleClick}>Add</button>

      {data.map((value) => (
        <div key={value.id}>
          <h1>Hello</h1>
          <h1>Product Name : {value.name}</h1>
          <h1>Price : {value.price}</h1>
          <h1>Ratting : {value.ratting}</h1>
          <h1>Seller : {value.seller}</h1>
          <img src={value.img} height="200px" width="200px" alt="product" />
        </div>
      ))}
    </div>
  );
}

export default StoreImageTextFirebase;
