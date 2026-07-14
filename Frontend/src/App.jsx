import React from "react";
import {Routes, Route} from "react-router-dom";
import Auth from "./pages/public/Auth"
import Login from "./pages/public/Login";
import SignUp from "./pages/public/SignUp";

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Auth/>}>
        <Route index element={<Login />}/>
        <Route path="/signup" element={<SignUp/>}/> 
      </Route>
      </Routes>
    </>
  )
}

export default App
