import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
// import Analytics from "./Analytics";

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [sale, setSale] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        const totalStockAmount = data.reduce(
          (accumulator, product) => accumulator + product.stock_amount,
          0
        );
        setTotalProducts(totalStockAmount);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/sales")
      .then((resp) => resp.json())
      .then((record) => {
        setSale(record);
      });
  }, []);

  return (
    <>
      <div class="admin-content mx-auto">
        {/* <h1 class="page-header">Welcome to Dashboard</h1> */}
        <div class="w-75">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12 col-md-4">
                <div class="dash-summary-cell">
                  <p>
                    <strong>Total Products</strong>
                  </p>
                  <p>{totalProducts}</p>
                </div>
              </div>
              <div class="col-12 col-md-4">
                <div class="dash-summary-cell">
                  <p>
                    <strong>Total Invoices</strong>
                  </p>
                  <p>3400</p>
                </div>
              </div>
              <div class="col-12 col-md-4">
                <div class="dash-summary-cell">
                  <p>
                    <strong>Total Sell Today</strong>
                  </p>
                  <p>123500</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h1>Sales Dashboard</h1>
      <div style={{ height: "400px", overflow: "scroll" }}>
        <table >
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(sale).map((saleId) => (
              <tr key={saleId}>
                <td>{sale[saleId].product ? sale[saleId].product.name : ""}</td>
                <td>{sale[saleId].quantity}</td>
                <td>{sale[saleId].amount}</td>
                <td>{sale[saleId].date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
