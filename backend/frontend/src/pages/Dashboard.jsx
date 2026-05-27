import { useEffect, useState } from "react";

import api from "../api";

import UploadForm from "../components/UploadForm";

import AnalyticsChart from "../components/AnalyticsChart";

import ScopePieChart from "../components/ScopePieChart";


function Dashboard({ onLogout }) {

  const [records, setRecords] = useState([]);


  useEffect(() => {
    fetchRecords();
  }, []);


  const fetchRecords = async () => {

    try {

      const res = await api.get("records/");

      setRecords(res.data);

    } catch (error) {

      console.error(error);

    }
  };


  const approveRecord = async (id) => {

    try {

      await api.post(`approve/${id}/`);

      fetchRecords();

    } catch (error) {

      console.error(error);

    }
  };


  const rejectRecord = async (id) => {

  try {

    await api.post(`reject/${id}/`);

    fetchRecords();

  } catch (error) {

    console.error("Reject Error:", error);

    alert("Reject failed");
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


  const totalRecords = records.length;

  const suspiciousRecords =
    records.filter((r) => r.suspicious).length;

  const approvedRecords =
    records.filter((r) => r.status === "APPROVED").length;

  const rejectedRecords =
    records.filter((r) => r.status === "REJECTED").length;


  return (

    <div
      style={{
        padding: "40px",
        fontFamily: "Arial",
        backgroundColor: "#0f172a",
        minHeight: "100vh",
        color: "white"
      }}
    >

      {/* Top Section */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}
      >

        <div>

          <h1
            style={{
              fontSize: "42px",
              marginBottom: "10px",
              fontWeight: "bold"
            }}
          >
            CarbonFlow Dashboard
          </h1>


          <p
            style={{
              color: "#94a3b8"
            }}
          >
            ESG Data Review & Analytics Platform
          </p>

        </div>


        <button
          onClick={onLogout}
          style={{
            backgroundColor: "#475569",
            color: "white",
            border: "none",
            padding: "12px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            height: "50px"
          }}
        >
          Logout
        </button>

      </div>


      {/* Upload Section */}

      <UploadForm refreshRecords={fetchRecords} />


      {/* Clear Data Button */}

      <button
        onClick={clearRecords}
        style={{
          backgroundColor: "#dc2626",
          color: "white",
          border: "none",
          padding: "12px 18px",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "30px",
          fontWeight: "bold"
        }}
      >
        Clear All Data
      </button>


      {/* Stats Cards */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "35px",
          flexWrap: "wrap"
        }}
      >

        <div style={cardStyle}>
          <h3>Total Records</h3>

          <p style={numberStyle}>
            {totalRecords}
          </p>
        </div>


        <div style={cardStyle}>
          <h3>Suspicious Records</h3>

          <p style={numberStyle}>
            {suspiciousRecords}
          </p>
        </div>


        <div style={cardStyle}>
          <h3>Approved Records</h3>

          <p style={numberStyle}>
            {approvedRecords}
          </p>
        </div>


        <div style={cardStyle}>
          <h3>Rejected Records</h3>

          <p style={numberStyle}>
            {rejectedRecords}
          </p>
        </div>

      </div>


      {/* Analytics Charts */}

      <AnalyticsChart records={records} />

      <ScopePieChart records={records} />


      {/* Records Table */}

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "#111827",
          borderRadius: "10px",
          overflow: "hidden"
        }}
      >

        <thead>

          <tr
            style={{
              backgroundColor: "#1e293b"
            }}
          >

            <th style={tableHeader}>Source</th>

            <th style={tableHeader}>Category</th>

            <th style={tableHeader}>Scope</th>

            <th style={tableHeader}>Value</th>

            <th style={tableHeader}>Unit</th>

            <th style={tableHeader}>Emissions</th>

            <th style={tableHeader}>Status</th>

            <th style={tableHeader}>Suspicious</th>

            <th style={tableHeader}>Action</th>

          </tr>

        </thead>


        <tbody>

          {records.map((r) => (

            <tr
              key={r.id}
              style={{
                borderBottom: "1px solid #374151"
              }}
            >

              <td style={tableCell}>
                {r.source_type}
              </td>

              <td style={tableCell}>
                {r.category}
              </td>

              <td style={tableCell}>
                {r.scope}
              </td>

              <td style={tableCell}>
                {r.activity_value}
              </td>

              <td style={tableCell}>
                {r.unit}
              </td>

              <td style={tableCell}>
                {r.emissions_kg_co2e}
              </td>

              <td style={tableCell}>
                {r.status}
              </td>

              <td style={tableCell}>
                {r.suspicious ? "⚠️" : "✅"}
              </td>

              <td style={tableCell}>

                {r.status === "APPROVED" ? (

                  <span
                    style={{
                      color: "#22c55e",
                      fontWeight: "bold"
                    }}
                  >
                    Approved
                  </span>

                ) : r.status === "REJECTED" ? (

                  <span
                    style={{
                      color: "#ef4444",
                      fontWeight: "bold"
                    }}
                  >
                    Rejected
                  </span>

                ) : (

                  <div
                    style={{
                      display: "flex",
                      gap: "10px"
                    }}
                  >

                    <button
                      onClick={() => approveRecord(r.id)}
                      style={{
                        backgroundColor: "#16a34a",
                        color: "white",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "bold"
                      }}
                    >
                      Approve
                    </button>


                    <button
                      onClick={() => rejectRecord(r.id)}
                      style={{
                        backgroundColor: "#dc2626",
                        color: "white",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "bold"
                      }}
                    >
                      Reject
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
}


/* Styles */

const cardStyle = {

  backgroundColor: "#1e293b",

  padding: "20px",

  borderRadius: "10px",

  width: "220px"
};


const numberStyle = {

  fontSize: "32px",

  fontWeight: "bold",

  marginTop: "10px"
};


const tableHeader = {

  padding: "16px",

  textAlign: "left"
};


const tableCell = {

  padding: "16px"
};


export default Dashboard;