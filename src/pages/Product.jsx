import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Product.css";
// import { API } from "./api"

const Product = ({ onAddProduct }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [stockAmount, setStockAmount] = useState("");
  const [price, setPrice] = useState("");

  

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if any fields are empty
    if (!name || !stockAmount || !price) {
      alert("Please fill in all fields");
      return;
    }

    // Create new product object
    const newProduct = {
      name: name,
      // category: category,
      stock_amount: stockAmount,
      price: price,
    };

    try {
      // Make POST request to the Rails API endpoint
      const response = await fetch("https://bejulia-api.onrender.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to add product.");
      }

      // Call onAddProduct function with new product object
      onAddProduct(newProduct);

      // Reset form fields
      setName("");
      // setCategory("");
      setStockAmount("");
      setPrice("");
    } catch (error) {
      console.error(error);
    }
    //return to  product list
    navigate("/productList");
  };

  return (
    <div className="product-form">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="stockAmount">Stock Amount:</label>
          <input
            type="number"
            className="form-control"
            id="stockAmount"
            value={stockAmount}
            onChange={(event) => setStockAmount(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Product;
