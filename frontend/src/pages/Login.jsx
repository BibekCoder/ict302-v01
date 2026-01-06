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
      localStorage.setItem("email", JSON.stringify(data.email));
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role); // Store user role
     
      if (data.role === "admin"){
        navigate("/admin/dashboard");
      }else{
        navigate("/unauthorized")
      }
  }catch (err){
    setError(err.message);

  }finally{
    setLoading(false);
  }
}

return (
    <div className="login-page">
         <div className="login-card">
           <h2 className="title">SORTEM</h2>
           <p className="subtitle">Login to your account</p>
   
           <form onSubmit={handleSubmit}>
             <input
               type="text"
               placeholder="Email or Username"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
             />
   
             <input
               type="password"
               placeholder="Password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
             />
   
            <button disabled={loading} className ="login-button">{loading? "Logging in...": "Login"}</button>
            {error && <p >{error}</p>}
           </form>
   
           
           </div>
         </div>
     
  );
}



