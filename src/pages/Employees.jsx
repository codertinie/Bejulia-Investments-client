import React, { useState } from "react";
import "../styles/Employees.css";

const Employees = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      role: "Manager",
      joinedAt: "2021-02-10",
      active: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      role: "Developer",
      joinedAt: "2021-03-15",
      active: false,
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bobjohnson@example.com",
      role: "Designer",
      joinedAt: "2021-04-20",
      active: true,
    },
  ]);

  const [editing, setEditing] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({
    id: null,
    name: "",
    email: "",
    role: "",
    joinedAt: "",
    active: false,
  });

  const editRow = (employee) => {
    setEditing(!editing);
    setCurrentEmployee({
      id: employee.id,
      name: employee.name,
      email: employee.email,
      role: employee.role,
      joinedAt: employee.joinedAt,
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
    setEmployees(employees.filter((employee) => employee.id !== id));
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
              <td>{employee.joinedAt}</td>
              <td>{employee.active ? "Active" : "Inactive"}</td>
              <td>
                <button
                    
                  className="btn btn-primary mr-2"
                  onClick={() => editRow(employee)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
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
