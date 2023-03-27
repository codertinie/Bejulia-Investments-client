import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Employees.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/employees")
      .then((resp) => resp.json())
      .then((data) => setEmployees(data));
  }, []);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [updatedEmployee, setUpdatedEmployee] = useState({
    name: "",
    email: "",
    role: "",
    joined_at: "",
    active: "",
  });

  const openModal = (employee) => {
    setEditingEmployee(employee);
    setUpdatedEmployee(employee);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditingEmployee(null);
    setUpdatedEmployee({
      name: "",
      email: "",
      role: "",
      joined_at: "",
      // active: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedEmployee({ ...updatedEmployee, [name]: value });
  };

  const handleUpdateEmployee = () => {
    const { id, ...updatedData } = updatedEmployee;
    fetch(`/employees/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setEmployees(
          employees.map((employee) =>
            employee.id === data.id ? data : employee
          )
        );
        closeModal();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="table-responsive">
      <div className="add">
        <button onClick={() => navigate("/register")}>ADD Employee</button>
      </div>
      <table className="table table-bordered table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined At</th>
            {/* <th>Status</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
              <td>{employee.joined_at}</td>
              {/* <td>{employee.active ? "Active" : "Inactive"}</td> */}
              <td>
                <div>
                  <button
                    className="btn btn-primary mr-2"
                    onClick={() => openModal(employee)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      fetch(`/employees/${employee.id}`, {
                        method: "DELETE",
                      })
                        .then((response) => {
                          if (!response.ok) {
                            throw new Error(
                              `HTTP error! status: ${response.status}`
                            );
                          }
                          setEmployees(
                            employees.filter((emp) => emp.id !== employee.id)
                          );
                        })
                        .catch((error) => console.error("Error:", error))
                    }
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal">
        <h2>Edit Employee</h2>
        {editingEmployee && (
          <form onSubmit={handleUpdateEmployee}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={updatedEmployee.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={updatedEmployee.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <input
                type="text"
                className="form-control"
                id="role"
                name="role"
                value={updatedEmployee.role}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="joined_at">Joined At</label>
              <input
                type="text"
                className="form-control"
                id="joined_at"
                name="joined_at"
                value={updatedEmployee.joined_at}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};
export default Employees;
