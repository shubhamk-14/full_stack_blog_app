import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import AllUsers from "./pages/AllUsers";

function App() {
  return (
    <>
    <Navbar/>
    <div className="container mt-4">
      <Routes>
        <Route path="/" element={<Posts/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/users" element={<AllUsers/>}/>
        <Route path="/create-post" element={<CreatePost/>}/>
        <Route path="/edit-post/:id" element={<EditPost/>}/>
      </Routes>
    </div>

    </>
  );
}

export default App;
