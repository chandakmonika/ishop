import React from 'react'
import ForgetPassword from "./ForgetPassword";
import Login from "./Login";
import Routing from "./Routing";
import { Route, Routes, Link } from "react-router-dom";
export default function Rout() {
  return (
    <div>
       <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route  path="/forgetpassword" element={<ForgetPassword />} />
        <Route  path="/routing" element={<Routing />} />
      </Routes>
    </div>
  )
}
