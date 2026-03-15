import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";


const API_URL = "http://127.0.0.1:8000";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");
    const loggedInUserId = localStorage.getItem("username");

    console.log(loggedInUserId)
    const fetchPost = async () => {
        try {
            const res = await fetch(`${API_URL}/posts/`);
            const data = await res.json();
            if (!res.ok || !Array.isArray(data)) {
                setError(data?.detail || "Failed to load posts.");
                setPosts([]);
                return;
            }
            setError("");
            setPosts(data);
        } catch (err) {
            setError("Failed to load posts.");
            setPosts([]);
        }
    };

    useEffect(()=> {fetchPost();},[]);

    const handleDelete = async (id) => {
        const res = await fetch(`${API_URL}/posts/${id}/`,{
            method:"DELETE",
            headers: {Authorization: `Bearer ${token}`},
        });
        if (res.ok) {
            setPosts(posts.filter(p => p.id !== id));
        } else {
            alert("You can only delete your own posts!");
        }
    };

    return (
        <div>
            <h3>All Posts</h3>
            {error && <p className="text-danger">{error}</p>}
            {posts.length === 0 && !error ? (
                <p>No posts found.</p>
            ) : (
                posts.map((post)=> (
                    <div className="card my-2 p-3" key={post.id}>
                        <h5>{post.title}</h5>
                        <p>{post.content}</p>
                        <small className="text-muted">Author: {post.author}</small>
                        {token && loggedInUserId === post.author && (
                            <div className="mt-2">
                                <Link className="btn btn-warning btn-sm me-2" to={`/edit-post/${post.id}`}>Edit</Link>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(post.id)}>Delete</button>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default Posts;
