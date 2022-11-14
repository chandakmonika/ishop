import React from 'react'
import {  useNavigate } from "react-router-dom";

export default function Index() {
    const navigate = useNavigate();
  return (
    <div>
      <h2>Page Not Found</h2>
      <button onClick={()=> navigate("/")}>Back to Login </button>
    </div>
  )
}
