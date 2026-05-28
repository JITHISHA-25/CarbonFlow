import { useEffect, useState } from "react";

import api from "../api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";


function Dashboard({ onLogout }) {

  const [records, setRecords] = useState([]);

  const COLORS = [
    "#22c55e",
    "#3b82f6",
    "#f59e0b"
  ];


  useEffect(() => {

    fetchRecords();

  }, []);


  const fetchRecords = async () => {

    try {

      const response =
        await api.get("records/");

      setRecords(response.data);

    } catch (error) {

      console.error(error);
    }
  };


  const approveRecord = async (id) => {

    try {

      await api.post(
        `approve/${id}/`
      );

      fetchRecords();

    } catch (error) {

      console.error(error);

      alert("Approval failed");
    }
  };


  const clearRecords = async () => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to clear all records?"
      );

    if (!confirmDelete) return;

    try {

      await api.delete("clear/");

      fetchRecords();

    } catch (error) {

      console.error(error);
    }
  };


  const uploadFile = async (
    endpoint,
    file
  ) => {

    const formData = new FormData();

    formData.append("file", file);

    try {

      await api.post(
        endpoint,
        formData
      );

      fetchRecords();

      alert("Upload successful");

    } catch (error) {

      console.error(error);

      alert("Upload failed");
    }
  };


  const totalRecords = records.length;

  const suspiciousRecords =
    records.filter(
      (r) => r.suspicious
    ).length;

  const approvedRecords =
    records.filter(
      (r) =>
        r.status === "APPROVED"
    ).length;


  const pendingRecords =
    totalRecords -
    approvedRecords;


  const scopeData = [

    {
      name: "Scope 1",
      value:
        records.filter(
          (r) =>
            r.scope === "Scope 1"
        ).length
    },

    {
      name: "Scope 2",
      value:
        records.filter(
          (r) =>
            r.scope === "Scope 2"
        ).length
    },

    {
      name: "Scope 3",
      value:
        records.filter(
          (r) =>
            r.scope === "Scope 3"
        ).length
    }
  ];


  const statusData = [

    {
      name: "Approved",
      value: approvedRecords
    },

    {
      name: "Pending",
      value: pendingRecords
    }
  ];


  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right, #0f172a, #111827)",
        padding: "40px",
        color: "white",
        fontFamily: "Arial"
      }}
    >

      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "40px"
        }}
      >

        <div>

          <h1
            style={{
              fontSize: "48px",
              marginBottom: "10px"
            }}
          >
            CarbonFlow
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "18px"
            }}
          >
            ESG Analytics Dashboard
          </p>

        </div>


        <button
          onClick={onLogout}
          style={logoutButton}
        >
          Logout
        </button>

      </div>


      {/* Stats Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "40px"
        }}
      >

        <Card
          title="Total Records"
          value={totalRecords}
        />

        <Card
          title="Suspicious Records"
          value={suspiciousRecords}
        />

        <Card
          title="Approved"
          value={approvedRecords}
        />

        <Card
          title="Pending"
          value={pendingRecords}
        />

      </div>


      {/* Upload Section */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "40px"
        }}
      >

        <UploadCard
          title="Upload SAP CSV"
          endpoint="upload/sap/"
          uploadFile={uploadFile}
        />

        <UploadCard
          title="Upload Utility CSV"
          endpoint="upload/utility/"
          uploadFile={uploadFile}
        />

        <UploadCard
          title="Upload Travel CSV"
          endpoint="upload/travel/"
          uploadFile={uploadFile}
        />

      </div>


      {/* Charts */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "30px",
          marginBottom: "40px"
        }}
      >

        {/* Scope Chart */}

        <div style={chartBox}>

          <h2
            style={{
              marginBottom: "20px"
            }}
          >
            Scope Distribution
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

              <Pie
                data={scopeData}
                dataKey="value"
                outerRadius={120}
                label
              >

                {scopeData.map(
                  (entry, index) => (

                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />

                  )
                )}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>


        {/* Status Chart */}

        <div style={chartBox}>

          <h2
            style={{
              marginBottom: "20px"
            }}
          >
            Status Analytics
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart
              data={statusData}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="name"
              />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="value"
                fill="#3b82f6"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>


      {/* Clear Button */}

      <button
        onClick={clearRecords}
        style={clearButton}
      >
        Clear All Records
      </button>


      {/* Table */}

      <div style={tableContainer}>

        <h2
          style={{
            marginBottom: "20px"
          }}
        >
          ESG Records
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse:
              "collapse"
          }}
        >

          <thead>

            <tr
              style={{
                backgroundColor:
                  "#1e293b"
              }}
            >

              <th style={thStyle}>
                Category
              </th>

              <th style={thStyle}>
                Scope
              </th>

              <th style={thStyle}>
                Activity
              </th>

              <th style={thStyle}>
                Unit
              </th>

              <th style={thStyle}>
                Emissions
              </th>

              <th style={thStyle}>
                Suspicious
              </th>

              <th style={thStyle}>
                Status
              </th>

              <th style={thStyle}>
                Action
              </th>

            </tr>

          </thead>


          <tbody>

            {records.map(
              (record) => (

                <tr
                  key={record.id}
                  style={{
                    backgroundColor:
                      "#111827",
                    borderBottom:
                      "1px solid #334155"
                  }}
                >

                  <td style={tdStyle}>
                    {record.category}
                  </td>

                  <td style={tdStyle}>
                    {record.scope}
                  </td>

                  <td style={tdStyle}>
                    {
                      record.activity_value
                    }
                  </td>

                  <td style={tdStyle}>
                    {record.unit}
                  </td>

                  <td style={tdStyle}>
                    {
                      record.emissions_kg_co2e
                    }
                  </td>

                  {/* Suspicious Column */}

                  <td style={tdStyle}>

                    {record.suspicious ? (

                      <span
                        style={{
                          backgroundColor:
                            "#dc2626",
                          color: "white",
                          padding:
                            "6px 12px",
                          borderRadius:
                            "20px",
                          fontWeight:
                            "bold"
                        }}
                      >
                        YES
                      </span>

                    ) : (

                      <span
                        style={{
                          backgroundColor:
                            "#166534",
                          color: "white",
                          padding:
                            "6px 12px",
                          borderRadius:
                            "20px",
                          fontWeight:
                            "bold"
                        }}
                      >
                        NO
                      </span>

                    )}

                  </td>


                  {/* Status */}

                  <td style={tdStyle}>

                    <span
                      style={{
                        padding:
                          "6px 12px",
                        borderRadius:
                          "20px",
                        backgroundColor:
                          record.status ===
                          "APPROVED"
                            ? "#166534"
                            : "#92400e",
                        color: "white",
                        fontSize:
                          "14px",
                        fontWeight:
                          "bold"
                      }}
                    >
                      {record.status}
                    </span>

                  </td>


                  {/* Action */}

                  <td style={tdStyle}>

                    {record.status ===
                    "APPROVED" ? (

                      <button
                        disabled
                        style={
                          approvedButton
                        }
                      >
                        Approved
                      </button>

                    ) : (

                      <button
                        onClick={() =>
                          approveRecord(
                            record.id
                          )
                        }
                        style={
                          approveButton
                        }
                      >
                        Approve
                      </button>

                    )}

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}


/* Upload Card */

function UploadCard({
  title,
  endpoint,
  uploadFile
}) {

  return (

    <div style={uploadBox}>

      <h3
        style={{
          marginBottom: "15px"
        }}
      >
        {title}
      </h3>

      <input
        type="file"
        onChange={(e) =>
          uploadFile(
            endpoint,
            e.target.files[0]
          )
        }
      />

    </div>
  );
}


/* Stats Card */

function Card({ title, value }) {

  return (

    <div style={cardStyle}>

      <h3
        style={{
          marginBottom: "15px",
          color: "#cbd5e1"
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          fontSize: "38px"
        }}
      >
        {value}
      </h1>

    </div>
  );
}


/* Styles */

const cardStyle = {

  backgroundColor: "#1e293b",

  padding: "25px",

  borderRadius: "18px",

  boxShadow:
    "0 4px 12px rgba(0,0,0,0.3)"
};


const uploadBox = {

  backgroundColor: "#1e293b",

  padding: "25px",

  borderRadius: "18px",

  minWidth: "250px",

  boxShadow:
    "0 4px 12px rgba(0,0,0,0.3)"
};


const chartBox = {

  backgroundColor: "#1e293b",

  padding: "25px",

  borderRadius: "18px",

  boxShadow:
    "0 4px 12px rgba(0,0,0,0.3)"
};


const tableContainer = {

  backgroundColor: "#1e293b",

  padding: "25px",

  borderRadius: "18px",

  overflowX: "auto",

  boxShadow:
    "0 4px 12px rgba(0,0,0,0.3)"
};


const logoutButton = {

  backgroundColor: "#334155",

  color: "white",

  border: "none",

  padding: "12px 20px",

  borderRadius: "10px",

  cursor: "pointer",

  fontWeight: "bold"
};


const clearButton = {

  backgroundColor: "#dc2626",

  color: "white",

  border: "none",

  padding: "12px 20px",

  borderRadius: "10px",

  cursor: "pointer",

  marginBottom: "30px",

  fontWeight: "bold"
};


const approveButton = {

  backgroundColor: "#16a34a",

  color: "white",

  border: "none",

  padding: "8px 14px",

  borderRadius: "8px",

  cursor: "pointer",

  fontWeight: "bold"
};


const approvedButton = {

  backgroundColor: "#475569",

  color: "white",

  border: "none",

  padding: "8px 14px",

  borderRadius: "8px",

  opacity: 0.7
};


const thStyle = {

  padding: "15px",

  textAlign: "left"
};


const tdStyle = {

  padding: "15px"
};


export default Dashboard;