import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000";

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/signup`,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, email, password}),
            });
            const data = await res.json();
            if(res.ok){
                alert("Signup Successful! Please login.");
                navigate("/login");
            }else {
                alert(data?.detail || "Signup failed.");
            }
        }catch (err) {
            console.error(err);
            alert("Signup failed. Is the backend running?");
        }
    };

    return (
        <div className="col-md-6 offset-md-3">
            <h3>Signup</h3>
            <form onSubmit={handleSignup}>
                <div className="mb-3">
                    <label>Username</label>
                    <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required/>
                </div>
                <button className="btn btn-primary">Signup</button>
            </form>
        </div>
    );
}

export default Signup;
