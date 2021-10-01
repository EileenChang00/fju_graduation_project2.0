import React from "react";
import AccountInput from "./AcountInput";
import "./login.css";


export default function Login() {
  return (
    <div>
      <div className="heads">
        <h1 style={{color:"black"}}>SCHRAMM</h1>
      </div>
      <AccountInput />
    </div>
  );
}

