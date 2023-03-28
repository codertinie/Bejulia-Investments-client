import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import "../styles/Analytics.css";

const Analytics = () => {
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [stockAmount, setStockAmount] = useState(0);
  const [quantityError, setQuantityError] = useState("");
  // const [items, setItems] = useState([])

  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState("");
  const [productNames, setProductNames] = useState([]);

  // const navigate = useNavigate()
  const API = "https://bejulia-api.onrender.com"

  useEffect(() => {
    // Fetch the current stock amount and price of the product from the server
    if (productId) {
      fetch(`${API}/products/${productId}`)
        .then((response) => response.json())
        .then((data) => {
          setStockAmount(data.stock_amount);
          setPrice(data.price);
        })
        .catch((error) => console.error(error));
    }
  }, [productId]);

  useEffect(() => {
    // Fetch the list of product names and IDs from the server
    fetch(`${API}/products`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setProductNames(data.map((product) => product.name));
        setProductId(data[0].id); // Set the default product ID to the first product
      })
      .catch((error) => console.error(error));
  }, []);

  const handleProductNameChange = (event) => {
    const selectedProductName = event.target.value;
    setProductName(selectedProductName);
    // Find the product ID and price for the selected product name
    const selectedProduct = products.find(
      (product) => product.name === selectedProductName
    );
    if (selectedProduct) {
      setProductId(selectedProduct.id);
      setPrice(selectedProduct.price);
    }
  };

  const validateQuantity = (value) => {
    if (value < 1) {
      return "Quantity must be at least 1";
    } else if (value > stockAmount) {
      return `Quantity cannot exceed the current stock amount of ${stockAmount}`;
    } else {
      return "";
    }
  };

  const handleSellProduct = (event) => {
    event.preventDefault();

    // Validate the quantity input
    const quantityError = validateQuantity(quantity);
    setQuantityError(quantityError);

    if (!quantityError) {
      // Calculate the total price based on the price and quantity
      const totalPrice = price * quantity;

      // Send a request to the server to update the stock amount and create a new sale record
      fetch(`${API}/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock_amount: stockAmount - quantity }),
      })
        .then((response) => response.json())
        .then((data) => {
          setStockAmount(data.stock_amount);
          console.log(stockAmount)
        })
        .catch((error) => console.error(error));

      const dateInEAT = new Date(new Date().getTime() + 3 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];

      fetch(`${API}/sales`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: productId,
          quantity: quantity,
          amount: totalPrice,
          date: dateInEAT,
        }),
      })
        .then((response) => {
          if (response.ok) {
            // Notify the user that the sale has been made successfully
            alert("Sale made successfully!");
            // Clear the form
            setProductName("");
            setProductId("");
            setPrice(0);
            setQuantity(0);
          } else {
            throw new Error("Failed to create sale");
          }
        })
        .catch((error) => console.error(error));
    }
    // navigate("/dashboard")
  };

  return (
    <div className="analytics">
      <form className="analytics-form" onSubmit={handleSellProduct}>
        <div className="product">
          <label>
            Product:
            <select value={productName} onChange={handleProductNameChange}>
              <option value="">--Select Product--</option>
              {productNames.map((productName, index) => (
                <option key={products[index].id} value={productName}>
                  {productName}
                </option>
              ))}
            </select>
          </label>
        </div>
        <br />
        <div>
          <label>
            Price:
            <input type="number" value={price} readOnly />
          </label>
        </div>
        <div>
          <label>
            Quantity:
            <input
              type="number"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
          </label>
          <div className="error">{quantityError}</div>
        </div>

        <br />
        <br />
        <div className="total-price">
          <p>Total price: Ksh. {price * quantity}</p>
        </div>
        <div className="stock-amount">
          <p> {stockAmount} units remaining</p>
        </div>
        <div>
          <button type="submit">Sell</button>
        </div>
      </form>
    </div>
  );
};

export default Analytics;
