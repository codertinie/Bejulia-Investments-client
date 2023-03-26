import React, { useEffect, useState } from 'react';
import "../styles/ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.log(error));
  }, []);
  
// console.log (products)

  return (
    <div style={{ height: "550px", overflow: "scroll" }}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            {/* <th>Category</th> */}
            <th>Stock Amount</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              {/* <td>{product.category}</td> */}
              <td>{product.stock_amount}</td>
              <td>Ksh. {product.price}</td>
              <td>
                <button className="view-btn">View</button>
                <button className="edit-btn">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
};

export default ProductList;