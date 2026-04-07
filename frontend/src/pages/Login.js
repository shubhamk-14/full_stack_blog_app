import React, {useState} from "react";
import { useNavigate } from "react-router-dom";


import { API_URL } from "../config";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const res = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password}),
            });
            const data = await res.json();
            if(res.ok){
                localStorage.setItem("token", data.access_token);
                localStorage.setItem("user_id", data.user.id);
                localStorage.setItem("username", data.user.username);
                navigate("/");
            }else {
                alert(data?.detail || "Login failed.");
            }
        }catch (err){
            console.error(err);
            alert("Login failed. Is the backend running?");
        }
    };

    return (
        <div className="col-md-6 offset-md-3">
            <h3>Login</h3>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required/>
                </div>
                <button>Login</button>
            </form>
        </div>
    );
}

export default Login;
