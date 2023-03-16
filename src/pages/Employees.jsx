import React, { useState, useEffect } from "react";
import "../styles/Employees.css";

const Employees = () => {
  const [employees, setEmployees] = useState([]);


  useEffect(() => {
    fetch("http://127.0.0.1:3000/employees")
    .then(resp => resp.json())
    .then(data => setEmployees(data))
    
  },[])
  console.log(employees)
  

  const [editing, setEditing] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({
    id: null,
    name: "",
    email: "",
    role: "",
    joinedAt: "",
    active: "",
  });

  const editRow = (employee) => {
    setEditing(!editing);
    setCurrentEmployee({
      id: employee.id,
      name: employee.name,
      email: employee.email,
      role: employee.role,
      joinedAt: employee.joined_at,
      active: employee.active,
    });
  };

  const updateEmployee = (id, updatedEmployee) => {
    setEditing(false);
    setEmployees(
      employees.map((employee) =>
        employee.id === id ? updatedEmployee : employee
      )
    );
  };

  const deleteEmployee = (id) => {
    fetch(`http://127.0.0.1:3000/employees/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setEmployees(employees.filter((employee) => employee.id !== id));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  

  return (
    <div className="table-responsive">
      <div className="add">
        <button>ADD Employee</button>
      </div>
      <table className="table table-bordered table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined At</th>
            <th>Status</th>
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
              <td>{employee.active ? "Active" : "Inactive"}</td>
              <td>
                <button
                    
                  className="edit-btn btn-primary mr-2"
                  onClick={() => editRow(employee)}
                >
                  Edit
                </button>
                <button
                  className="view-btn btn-danger"
                  onClick={() => deleteEmployee(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;
