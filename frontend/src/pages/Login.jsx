import {useState} from "react";
import {useNavigate} from "react-router-dom";

const API_BASE= import.meta.env.VITE_API_BASE_URL;

export default function Login(){
  const navigate= useNavigate();

  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const [loading,setLoading]= useState(false);
  const [error, setError]= useState("");

  async function handleSubmit(e){
    e.preventDefault();
    setError("");

    if (!email || !password){
      setError("Email and password are required.");
      return;
    }
    
    try {
      setLoading(true);
      const res= await fetch(`${API_BASE}/api/auth/login`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password}),
      });

      if (!res.ok){
        const data = await res.json().catch(()=> ({}));
        throw new Error(data.message || `Login failed (${res.status})`);
      }

      const data= await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role); // Store user role
     
      if (data.role === "admin"){
        navigate("/admin/dashboard");
      }else{
        navigate("/")
      }
  }catch (err){
    setError(err.message);

  }finally{
    setLoading(false);
  }
}

return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2>Admin Login</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button disabled={loading} style={styles.button}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
  },
  card: {
    width: "300px",
    padding: "25px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,.1)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    background: "#1976d2",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
};