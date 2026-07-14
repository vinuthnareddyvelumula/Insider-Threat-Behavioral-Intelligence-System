import { useEffect, useState } from "react";

function Dashboard({ email, role, onLogout }) {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [activityCount, setActivityCount] = useState(0);
  const [riskScore, setRiskScore] = useState(0);
  const [threatLevel, setThreatLevel] = useState("Normal");

  const [activities, setActivities] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [employeeId, setEmployeeId] = useState("");
  const [name, setName] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");

  useEffect(() => {
    fetchEmployees();
    fetchActivities();
    fetchRiskScore();
    fetchThreatLevel();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/employees"
      );

      const data = await response.json();

      setEmployees(data);
      setEmployeeCount(data.length);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchActivities = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/activities"
      );

      const data = await response.json();

      setActivities(data);
      setActivityCount(data.length);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRiskScore = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/risk-score"
      );

      const data = await response.json();

      setRiskScore(data.risk_score);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchThreatLevel = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/detect-anomaly"
      );

      const data = await response.json();

      setThreatLevel(data.threat_level);
    } catch (error) {
      console.error(error);
    }
  };

  const addEmployee = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/employees",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            employee_id: employeeId,
            name: name,
            email: employeeEmail,
            department: department,
            designation: designation,
          }),
        }
      );

      if (response.ok) {
        fetchEmployees();

        setEmployeeId("");
        setName("");
        setEmployeeEmail("");
        setDepartment("");
        setDesignation("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createActivity = async (
    employeeId,
    activityType,
    description
  ) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/activities",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            employee_id: employeeId,
            activity_type: activityType,
            description: description,
          }),
        }
      );

      if (response.ok) {
        fetchActivities();
        fetchRiskScore();
        fetchThreatLevel();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getRiskLevel = () => {
    if (riskScore <= 30) return "🟢 Low Risk";
    if (riskScore <= 60) return "🟡 Medium Risk";
    return "🔴 High Risk";
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Insider Threat Behavioral Intelligence System</h1>

        <div className="user-info">
          <h2>Welcome, {email}</h2>
          <p>Role: {role}</p>

          <button onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="cards">
        <div className="card">
          <h3>Total Employees</h3>
          <p>{employeeCount}</p>
        </div>

        <div className="card">
          <h3>Total Activities</h3>
          <p>{activityCount}</p>
        </div>

        <div className="card">
          <h3>Risk Score</h3>
          <p>{riskScore}</p>
          <small>{getRiskLevel()}</small>
        </div>

        <div className="card">
          <h3>Threat Level</h3>

          <p>
            {threatLevel === "Critical"
              ? "🚨"
              : threatLevel === "High"
              ? "🔴"
              : "🟢"}
          </p>

          <small>{threatLevel}</small>
        </div>
      </div>

      {threatLevel === "Critical" && (
        <div className="risk-alert">
          🚨 CRITICAL THREAT DETECTED!
          <br />
          Possible insider threat activity detected.
          Immediate investigation required.
        </div>
      )}

      <div className="activity-section">
        <h2>Recent Activities</h2>

        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Activity Type</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id}>
                <td>{activity.employee_id}</td>
                <td>{activity.activity_type}</td>
                <td>{activity.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {role === "Admin" && (
        <div className="simulation-section">
          <h2>Activity Simulation</h2>

          <div className="simulation-buttons">
            <button
              onClick={() =>
                createActivity(
                  "EMP001",
                  "Login",
                  "Employee logged into the system"
                )
              }
            >
              Login Activity
            </button>

            <button
              onClick={() =>
                createActivity(
                  "EMP001",
                  "File Access",
                  "Opened confidential file"
                )
              }
            >
              File Access
            </button>

            <button
              onClick={() =>
                createActivity(
                  "EMP001",
                  "USB Usage",
                  "Connected external USB device"
                )
              }
            >
              USB Activity
            </button>

            <button
              onClick={() =>
                createActivity(
                  "EMP001",
                  "Email",
                  "Sent external email"
                )
              }
            >
              Email Activity
            </button>
          </div>
        </div>
      )}

      {role === "Admin" && (
        <div className="employee-form">
          <h2>Add Employee</h2>

          <input
            placeholder="Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />

          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Email"
            value={employeeEmail}
            onChange={(e) => setEmployeeEmail(e.target.value)}
          />

          <input
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />

          <input
            placeholder="Designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />

          <button onClick={addEmployee}>
            Add Employee
          </button>
        </div>
      )}

      {role === "Admin" && (
        <div className="employee-section">
          <h2>Employees</h2>

          <table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Designation</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.employee_id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.department}</td>
                  <td>{employee.designation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dashboard;