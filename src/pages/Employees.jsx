import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Employees.css";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:3000/employees")
      .then((resp) => resp.json())
      .then((data) => setEmployees(data));
  }, []);

  const [editing, setEditing] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({
    id: null,
    name: "",
    email: "",
    role: "",
    joined_at: "",
    active: "",
  });

  const editRow = (employee) => {
    setEditing(true);
    setCurrentEmployee({
      id: employee.id,
      name: employee.name,
      email: employee.email,
      role: employee.role,
      joined_at: employee.joined_at,
      active: employee.active,
    });
  };

  const updateEmployee = () => {
    fetch(`http://127.0.0.1:3000/employees/${currentEmployee.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentEmployee),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setEmployees(
          employees.map((employee) =>
            employee.id === data.id ? data : employee
          )
        );
        setEditing(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const deleteEmployee = (id) => {
    fetch(`http://127.0.0.1:3000/employees/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setEmployees(employees.filter((employee) => employee.id !== id));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  function addEmployee() {
    navigate("/register");
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentEmployee({ ...currentEmployee, [name]: value });
  };

  return (
    <div className="table-responsive">
      <div className="add">
        <button onClick={addEmployee}>ADD Employee</button>
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
              <td>
                {editing && currentEmployee.id === employee.id ? (
                  <input
                    type="text"
                    value={currentEmployee.name}
                    onChange={(event) =>
                      setCurrentEmployee({
                        ...currentEmployee,
                        name: event.target.value,
                      })
                    }
                  />
                ) : (
                  employee.name
                )}
              </td>
              <td>
                {editing && currentEmployee.id === employee.id ? (
                  <input
                    type="email"
                    value={currentEmployee.email}
                    onChange={(event) =>
                      setCurrentEmployee({
                        ...currentEmployee,
                        email: event.target.value,
                      })
                    }
                  />
                ) : (
                  employee.email
                )}
              </td>
              <td>
                {editing && currentEmployee.id === employee.id ? (
                  <input
                    type="text"
                    value={currentEmployee.role}
                    onChange={(event) =>
                      setCurrentEmployee({
                        ...currentEmployee,
                        role: event.target.value,
                      })
                    }
                  />
                ) : (
                  employee.role
                )}
              </td>
              <td>{employee.joined_at}</td>
              <td>{employee.active ? "Active" : "Inactive"}</td>
              <td>
                {editing && currentEmployee.id === employee.id ? (
                  <div>
                    <button
                      className="btn btn-success mr-2"
                      onClick={() =>
                        updateEmployee(currentEmployee.id, currentEmployee)
                      }
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
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
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;
