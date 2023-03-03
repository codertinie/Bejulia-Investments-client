import React from "react";
import "../styles/Dashboard.css";

const Dashboard = () => {
  return (
    <div class="admin-content mx-auto">
  <h1 class="page-header">Welcome to Dashboard</h1>
  <div class="w-75">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-md-4">
          <div class="dash-summary-cell">
            <p><strong>Total Products</strong></p>
            <p>1200</p>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="dash-summary-cell">
            <p><strong>Total Invoices</strong></p>
            <p>3400</p>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="dash-summary-cell">
            <p><strong>Total Sell Today</strong></p>
            <p>123500</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


  );
};

export default Dashboard;
