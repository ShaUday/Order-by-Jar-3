import React, { useState } from "react";
import "./model.css";
export const Modal = ({ totalQty, totalPrice, hideModal }) => {
  // form states
  const [cell, setCell] = useState(null);
  const [residentialAddress, setResidentialAddress] = useState("");

  const handleCloseModal = () => {
    hideModal();
  };
  const handleCashOnDelivery = (e) => {
    e.preventDefault();
    console.log(cell, residentialAddress);
  };
  return (
    <div className="shade-area">
      <div className="modal-container">
        <form className="form-group" onSubmit={handleCashOnDelivery}>
          <input
            type="number"
            className="form-control"
            placeholder="Cell No"
            required
            onChange={(e) => setCell(e.target.value)}
            value={cell}
          />
          <br></br>
          <input
            type="text"
            className="form-control"
            placeholder="Residential Address"
            required
            onChange={(e) => setResidentialAddress(e.target.value)}
            value={residentialAddress}
          />
          <br></br>
          <label>Total Quantity </label>
          <input
            type="text"
            className="form-control"
            readOnly
            required
            value={totalQty}
          />
          <br></br>
          <label>Total Price </label>
          <input
            type="text"
            className="form-control"
            readOnly
            required
            value={totalPrice}
          />
          <br></br>
          <button type="submit" className="btn btn-success btn-md">
            Submit
          </button>
        </form>
        <div className="delete-icon" onClick={handleCloseModal}>
          x
        </div>
      </div>
    </div>
  );
};
