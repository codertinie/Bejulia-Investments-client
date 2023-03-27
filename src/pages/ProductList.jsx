import React, { useEffect, useState } from "react";
import "../styles/ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetch("/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
  }, []);

  // console.log (products)

  const handleEdit = (e) => {
    e.preventDefault();
    fetch(`/products/${editingProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the products state with the edited product
        const updatedProducts = products.map((p) =>
          p.id === data.id ? data : p
        );
        setProducts(updatedProducts);
        // Reset the editingProduct state and close the modal
        setEditingProduct(null);
      })
      .catch((error) => console.log(error));
  };

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
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              {/* <td>{product.category}</td> */}
              <td>{product.stock_amount}</td>
              <td>Ksh. {product.price}</td>
              <td>
                <button className="view-btn">View</button>
                <button
                  className="edit-btn"
                  onClick={() => setEditingProduct(product)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingProduct && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setEditingProduct(null)}>
              &times;
            </span>
            <h2>Edit Product</h2>
            <form onSubmit={handleEdit}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, name: e.target.value })
                }
              />
              <label htmlFor="stock_amount">Stock Amount:</label>
              <input
                type="number"
                name="stock_amount"
                id="stock_amount"
                value={editingProduct.stock_amount}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    stock_amount: e.target.value,
                  })
                }
              />
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                name="price"
                id="price"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price: e.target.value,
                  })
                }
              />
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
