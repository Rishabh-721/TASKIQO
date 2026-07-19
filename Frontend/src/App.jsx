import React from "react";
import {Routes, Route} from "react-router-dom";
import Auth from "./pages/public/Auth"
import Login from "./pages/public/Login";
import SignUp from "./pages/public/SignUp";
import Dashboard from "./pages/Protected/Dashboard";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Home from "./pages/Protected/Home"

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Auth/>}>
        <Route index element={<Login />}/>
        <Route path="/signup" element={<SignUp/>}/> 
      </Route>
      <Route element={<ProtectedRoutes/>}>
      <Route path="/home" element={<Home/>}/>
            <Route index element={<Dashboard/>}/>
      </Route>
      </Routes>
    </>
  )
}

export default App
