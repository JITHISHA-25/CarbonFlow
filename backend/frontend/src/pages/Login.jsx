import { useState } from "react";


function Login({ onLogin }) {

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");


  const handleLogin = () => {

    if (
      username === "admin" &&
      password === "admin123"
    ) {

      localStorage.setItem(
        "isAuthenticated",
        "true"
      );

      onLogin();

    } else {

      alert("Invalid credentials");
    }
  };


  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right, #0f172a, #1e293b)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
        overflow: "hidden"
      }}
    >

      {/* Background Glow */}

      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background: "#2563eb",
          filter: "blur(180px)",
          opacity: "0.25",
          top: "-100px",
          left: "-100px"
        }}
      />


      <div
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          background: "#22c55e",
          filter: "blur(160px)",
          opacity: "0.15",
          bottom: "-80px",
          right: "-80px"
        }}
      />


      {/* Login Card */}

      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "400px",
          background: "rgba(30, 41, 59, 0.75)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "20px",
          padding: "45px",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.4)",
          color: "white"
        }}
      >

        {/* Logo */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "35px"
          }}
        >

          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background:
                "linear-gradient(to right, #2563eb, #22c55e)",
              margin: "0 auto 20px auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "36px",
              fontWeight: "bold"
            }}
          >
            C
          </div>


          <h1
            style={{
              fontSize: "34px",
              marginBottom: "10px"
            }}
          >
            CarbonFlow
          </h1>


          <p
            style={{
              color: "#cbd5e1",
              fontSize: "15px"
            }}
          >
            ESG Analytics & Review Platform
          </p>

        </div>


        {/* Username */}

        <div
          style={{
            marginBottom: "20px"
          }}
        >

          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#cbd5e1"
            }}
          >
            Username
          </label>

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            style={inputStyle}
          />

        </div>


        {/* Password */}

        <div
          style={{
            marginBottom: "25px"
          }}
        >

          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#cbd5e1"
            }}
          >
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={inputStyle}
          />

        </div>


        {/* Login Button */}

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            background:
              "linear-gradient(to right, #2563eb, #22c55e)",
            color: "white",
            border: "none",
            padding: "14px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
            transition: "0.3s"
          }}
        >
          Login
        </button>


        {/* Demo Credentials */}

        <div
          style={{
            marginTop: "25px",
            backgroundColor:
              "rgba(255,255,255,0.05)",
            padding: "15px",
            borderRadius: "10px",
            color: "#cbd5e1",
            fontSize: "14px"
          }}
        >

          <strong>Demo Credentials</strong>

          <p
            style={{
              marginTop: "10px"
            }}
          >
            Username: admin
          </p>

          <p>
            Password: admin123
          </p>

        </div>

      </div>

    </div>
  );
}


const inputStyle = {

  width: "100%",

  padding: "14px",

  borderRadius: "10px",

  border: "1px solid rgba(255,255,255,0.1)",

  backgroundColor: "rgba(255,255,255,0.05)",

  color: "white",

  fontSize: "15px",

  outline: "none",

  boxSizing: "border-box"
};


export default Login;