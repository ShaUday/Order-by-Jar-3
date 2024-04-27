import React from "react";

const Product = (props) => {
  console.log(props.product);
  //   destructuring
  const { name, img, seller, price } = props.product;
  return (
    <div className=" grid grid-cols-2  gap-40">
      <div>
        <img className=" h-96 w-96 m-10" src={img} alt="" />
      </div>
      <div className="m-10">
        <h4>{name}</h4>
        <p>
          <small>By : {seller}</small>
        </p>
        <p>Price : {price}</p>
      </div>
    </div>
  );
};

export default Product;
