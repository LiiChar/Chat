import React, { useEffect, useState } from "react";
import { Navigate, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import FIrsStr from "./components/FIrsStr";
import HomePage from "./components/HomePage/HomePage";
import PostsPage from "./components/PostsPage/PostsPage";
import CheckIn from "./components/Registation/CheckIn";
import Cheout from "./components/Registation/Cheout";
import Profile from "./components/Profile/Profile";
import "./App.css";

function App() {
  const [res, setRes] = useState({ log: "", pas: "" });

  function reset(par) {
    setRes(par);
  }

  return (
    <div className="main">
      <FIrsStr reset={res} />
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/Home" element={<HomePage reset={reset} />} />
        <Route path="/Post" element={<PostsPage reset={reset} />} />
        <Route path="/SignIn" element={<CheckIn reset={reset} />} />
        <Route path="/RegIn" element={<Cheout />} />
        <Route path="/Profile" element={<Profile reset={reset} />} />
        <Route path="*" element={<Navigate to="/Home" replace />} />
      </Routes>
    </div>
  );
}

export default App;
