import { useState } from "react";
//import viteLogo from '/vite.svg'
//import './App.css'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ShowPosts from "./components/ShowPosts.jsx";
import PostDetails from "./components/PostDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShowPosts></ShowPosts>}></Route>
        <Route path="/post/:postId" element={<PostDetails></PostDetails>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
