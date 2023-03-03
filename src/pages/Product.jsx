import React, { useState } from 'react';
import "../styles/Product.css"


const Product = ({ onAddProduct }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [stockAmount, setStockAmount] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create new product object
    const newProduct = {
      name: name,
      category: category,
      stockAmount: stockAmount,
      price: price
    };

    // Call onAddProduct function with new product object
    onAddProduct(newProduct);

    // Reset form fields
    setName('');
    setCategory('');
    setStockAmount('');
    setPrice('');
  }

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
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            className="form-control"
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
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
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
    </div>
  );
};

export default Product;
