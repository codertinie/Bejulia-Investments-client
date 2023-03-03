import React from 'react';
import "../styles/ProductList.css";

const ProductList = () => {
    return (
        <div>
            <table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Category</th>
      <th>Stock Amount</th>
      <th>Price</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Coca Cola</td>
      <td>300ml</td>
      <td>120</td>
      <td>$1.50</td>
      <td>
        <button class="view-btn">View</button>
        <button class="edit-btn">Edit</button>
      </td>
    </tr>
    <tr>
      <td>Sprite</td>
      <td>500ml</td>
      <td>80</td>
      <td>$2.00</td>
      <td>
        <button class="view-btn">View</button>
        <button class="edit-btn">Edit</button>
      </td>
    </tr>
    <tr>
      <td>Fanta</td>
      <td>1 liter</td>
      <td>50</td>
      <td>$3.50</td>
      <td>
        <button class="view-btn">View</button>
        <button class="edit-btn">Edit</button>
      </td>
    </tr>
    <tr>
      <td>Pepsi</td>
      <td>300ml</td>
      <td>90</td>
      <td>$1.50</td>
      <td>
        <button class="view-btn">View</button>
        <button class="edit-btn">Edit</button>
      </td>
    </tr>
    <tr>
      <td>Mountain Dew</td>
      <td>500ml</td>
      <td>70</td>
      <td>$2.50</td>
      <td>
        <button class="view-btn">View</button>
        <button class="edit-btn">Edit</button>
      </td>
    </tr>
    <tr>
      <td>Mirinda</td>
      <td>1 liter</td>
      <td>30</td>
      <td>$3.00</td>
      <td>
        <button class="view-btn">View</button>
        <button class="edit-btn">Edit</button>
      </td>
    </tr>
  </tbody>
</table>

        </div>
    );
};

export default ProductList;