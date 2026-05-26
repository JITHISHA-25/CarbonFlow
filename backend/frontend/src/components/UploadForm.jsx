import { useState } from "react";

import api from "../api";


function UploadForm({ refreshRecords }) {

  const [file, setFile] = useState(null);

  const [sourceType, setSourceType] =
    useState("sap");

  const [loading, setLoading] =
    useState(false);


  const handleUpload = async () => {

    if (!file) {

      alert("Please select a CSV file");

      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    let endpoint = "";

    if (sourceType === "sap") {

      endpoint = "upload/sap/";
    }

    else if (
      sourceType === "utility"
    ) {

      endpoint = "upload/utility/";
    }

    else {

      endpoint = "upload/travel/";
    }


    try {

      setLoading(true);

      await api.post(
        endpoint,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

      alert("Upload successful");

      refreshRecords();

    } catch (error) {

      console.error(error);

      alert("Upload failed");
    }

    setLoading(false);
  };


  return (

    <div
      style={{
        backgroundColor: "#1e293b",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "30px"
      }}
    >

      <h2
        style={{
          marginBottom: "15px",
          color: "white"
        }}
      >
        Upload ESG Data
      </h2>


      <select
        value={sourceType}
        onChange={(e) =>
          setSourceType(e.target.value)
        }
        style={{
          padding: "10px",
          marginRight: "15px",
          borderRadius: "6px"
        }}
      >

        <option value="sap">
          SAP Fuel Data
        </option>

        <option value="utility">
          Utility Electricity Data
        </option>

        <option value="travel">
          Travel Data
        </option>

      </select>


      <input
        type="file"
        accept=".csv"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
        style={{
          color: "white"
        }}
      />


      <button
        onClick={handleUpload}
        style={{
          marginLeft: "15px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          padding: "10px 18px",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >

        {loading
          ? "Uploading..."
          : "Upload"}

      </button>

    </div>
  );
}

export default UploadForm;