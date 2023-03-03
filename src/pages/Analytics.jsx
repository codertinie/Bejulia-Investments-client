import React, { useState } from "react";
import "../styles/Analytics.css";

const Analytics = () => {
  const [invoices, setInvoices] = useState([]);
  const [customer, setCustomer] = useState("");
  const [total, setTotal] = useState("");
  const [paid, setPaid] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [date, setDate] = useState("");

  const handleCustomerChange = (e) => {
    setCustomer(e.target.value);
  };

  const handleTotalChange = (e) => {
    setTotal(e.target.value);
  };

  const handlePaidChange = (e) => {
    setPaid(e.target.checked);
  };

  const handleTransactionIdChange = (e) => {
    setTransactionId(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const createInvoice = (e) => {
    e.preventDefault();
    const newInvoice = {
      customer: customer,
      total: total,
      paid: paid,
      transactionId: transactionId,
      date: date
    };
    setInvoices([...invoices, newInvoice]);
    setCustomer("");
    setTotal("");
    setPaid(false);
    setTransactionId("");
    setDate("");
  };

  return (
    <div>
      <>
        <form onSubmit={createInvoice} className="analytics">
          <div className="form-group">
            <label htmlFor="customer">Customer:</label>
            <input
              type="text"
              className="form-control"
              id="customer"
              value={customer}
              onChange={handleCustomerChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="total">Total:</label>
            <input
              type="text"
              className="form-control"
              id="total"
              value={total}
              onChange={handleTotalChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="paid">Paid:</label>
            <input
              type="checkbox"
              className="form-control"
              id="paid"
              checked={paid}
              onChange={handlePaidChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="transactionId">Transaction ID:</label>
            <input
              type="text"
              className="form-control"
              id="transactionId"
              value={transactionId}
              onChange={handleTransactionIdChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              className="form-control"
              id="date"
              value={date}
              onChange={handleDateChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Create Invoice
          </button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Transaction ID</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={index}>
                <td>{invoice.customer}</td>
                <td>{invoice.total}</td>
                <td>{invoice.paid ? "Yes" : "No"}</td>
                <td>{invoice.transactionId}</td>
                <td>{invoice.date}</td>
              </tr>
            ))}
            </tbody>
        </table>
        
      </>
    </div>
  );
};

export default Analytics;
