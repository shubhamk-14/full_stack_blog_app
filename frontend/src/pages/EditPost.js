import React, {useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { API_URL } from "../config";

function EditPost() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(()=> {
        const fetchPost = async () => {
            const res = await fetch(`${API_URL}/posts/${id}/`);
            const data = await res.json();
            setTitle(data.title);
            setContent(data.content);
        };
        fetchPost();
    },[id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${API_URL}/posts/${id}/`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({title, content }),
        });
        if (res.ok) navigate("/");
        else alert("Error updating post!");
    };

    return (
        <div className="col-md-6 offset-md-3">
            <h3>EditPost</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Title</label>
                    <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <label>Content</label>
                    <textarea className="form-control" value={content} onChange={e => setContent(e.target.value)} required></textarea>
                </div>
                <button className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}

export default EditPost;
