import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  function loginAsAdmin() {
    localStorage.setItem("role", "admin");
    navigate("/admin/dashboard");
  }

  function loginAsSupport() {
    localStorage.setItem("role", "support");
    navigate("/admin/dashboard");
  }

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Login</h1>
      <p>Choose a role for demo</p>

      <button onClick={loginAsAdmin}>Login as Admin</button>
      <br /><br />
      <button onClick={loginAsSupport}>Login as Support</button>
    </div>
  );
}
