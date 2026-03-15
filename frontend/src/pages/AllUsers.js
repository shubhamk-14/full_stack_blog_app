import React, {useEffect,useState} from "react";

const API_URL = "http://127.0.0.1:8000";

function AllUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/users/`)
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch((err) => console.error(err));
    },[]);

    return (
        <div className="container mt-4">
            <h3 className="mb-3">All Registered Users</h3>
            <div className="list-group">
                {users.length > 0 ?(
                    users.map((user) =>(
                        <div key={user.id} className="list-group-item">
                            <h5>{user.username}</h5>
                            <p className="text-muted">Email:{user.email}</p>
                        </div>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </div>
        </div>
    );
}

export default AllUsers;
