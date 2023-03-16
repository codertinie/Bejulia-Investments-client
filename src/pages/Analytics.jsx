import React, { useEffect, useState } from "react";
import "../styles/Analytics.css";

const Analytics = () => {
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [stockAmount, setStockAmount] = useState(0);

  const [products, setProducts] = useState([])
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');
  const [productNames, setProductNames] = useState([]);

  useEffect(() => {
    // Fetch the current stock amount of the product from the server
    if (productId) {
      fetch(`http://127.0.0.1:3000/products/${productId}`)
        .then(response => response.json())
        .then(data => setStockAmount(data.stock_amount))
        .catch(error => console.error(error));
    }
  }, [productId]);

  useEffect(() => {
    // Fetch the list of product names and IDs from the server
    fetch('http://127.0.0.1:3000/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data)
        setProductNames(data.map(product => product.name));
        setProductId(data[0].id); // Set the default product ID to the first product
      })
      .catch(error => console.error(error));
  }, []);

  // console.log( products)
  // console.log(productName)

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send a request to the server to update the stock amount
    fetch(`http://127.0.0.1:3000/products/${productId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity })
    })
      .then(response => response.json())
      .then(data => setStockAmount(data.stock_amount))
      .catch(error => console.error(error));
  }


  const handleProductNameChange = (event) => {
    const selectedProductName = event.target.value;
    setProductName(selectedProductName);
    // Find the product ID for the selected product name
    const selectedProduct = products.find(product => product.name === selectedProductName);
    if (selectedProduct) {
      setProductId(selectedProduct.id);
    }
    
  }

  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Product:
          <select value={productName} onChange={handleProductNameChange}>
            <option value="">-- Select a product --</option>
            {productNames.map(name => (
              <option key={name.id} value={name}>{name}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Price:
          <input type="number" value={price} onChange={(event) => setPrice(event.target.value)} />
        </label>
        <br />
        <label>
          Quantity:
          <input type="number" value={quantity} onChange={(event) => setQuantity(event.target.value)} />
        </label>
        <br />
        <button type="submit">Sell</button>
        <p>Stock amount: {stockAmount}</p>
      </form>
    </div>
  );
};

export default Analytics;
