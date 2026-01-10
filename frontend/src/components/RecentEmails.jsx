import { useEffect,useState } from "react";
import {apiGet} from  "../api.js";
import { useNavigate } from "react-router-dom";

export default function RecentEmails() {
const navigate = useNavigate();
const [logs,setLogs]  = useState([]);
const [loading,setLoading] = useState(true);
const [error,setError] = useState("");

const token = localStorage.getItem("token");

useEffect(() => {
    let alive = true;

    const fetchLogs = async () => {
    try{
    
        setLoading(true);
        setError("");

        const data = await apiGet("/api/email-logs", token);

        if( alive ) setLogs(data || []);
    } catch (err){
        if (alive) setError( err.message || "Failed to load email logs");
    } finally {
        if (alive) setLoading(false);
    }
    };
       
    fetchLogs();
    return () => (alive = false);
},[token]);

if (loading) return <div className="card">Loading email logs…</div>;
if (error) return <div className="card">Error: {error}</div>;
return (

    <div className="re-section">
        <div className="section-header">
            <h2>Recent Emails</h2>
            <button onClick={() => navigate("/admin/email-logs")}>View All &gt;  </button>
        </div>

        <div className="grid">
            {logs.slice(0,6).map((log) => (
                <div className="card" key={log.logId}>
                    <h3>To: {log.to}</h3>
                    <p>Subject: {log.subject}</p>
                    <p>Sent At: {new Date(log.sendAt).toLocaleString()}</p>
                </div>
            ))}
        </div>
    </div>

);
}