import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
// import Analytics from "./Analytics";

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [sales, setSales] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

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
      .then((records) => {
        setSales(records);
      });
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const filteredSales = sales.filter((sale) => {
    return sale.date === selectedDate;
  });

  const uniqueProducts = Array.from(new Set(filteredSales.map(sale => sale.product?.name)));

  const getTotalSalesAmountForDate = () => {
    const salesForDate = sales.filter((sale) => {
      return sale.date === selectedDate;
    });
    return salesForDate.reduce(
      (accumulator, sale) => accumulator + sale.amount,
      0
    );
  };

  const getTotalInvoicesForDate = () => {
    const invoicesForDate = sales.filter((sale) => {
      return sale.date === selectedDate;
    });
    return invoicesForDate.length;
  };

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
                    <strong>Total Invoices Today</strong>
                  </p>
                  <p>{getTotalInvoicesForDate()}</p>
                </div>
              </div>
              <div class="col-12 col-md-4">
                <div class="dash-summary-cell">
                  <p>
                    <strong>Total Sell Today</strong>
                  </p>
                  <p>Ksh. {getTotalSalesAmountForDate()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h1>Sales Dashboard</h1>
      <div>
        <label htmlFor="date-input">Select Date:</label>
        <input
          type="date"
          id="date-input"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      <div style={{ height: "350px", overflow: "scroll" }}>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {uniqueProducts.map((productName) => {
              const filteredSalesForProduct = filteredSales.filter(
                (sale) => sale.product?.name === productName
              );
              const totalQuantity = filteredSalesForProduct.reduce(
                (accumulator, sale) => accumulator + sale.quantity,
                0
              );
              const totalAmount = filteredSalesForProduct.reduce(
                (accumulator, sale) => accumulator + sale.amount,
                0
              );
              return (
                <tr key={productName}>
                  <td>{productName}</td>
                  <td>{totalQuantity}</td>
                  <td>{totalAmount}</td>
                  <td>{selectedDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
