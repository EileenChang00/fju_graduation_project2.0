import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./login.css";

export default function AccountInput() {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  //fetchapi = "https://api.airtable.com/v0/appIM03h0z55HyJ4S/employee?view=Grid%20view"
  const axios_config = {
    headers: { Authorization: "Bearer keyC0nR1e39lOmrhm" },
  };
  const url =
    "https://api.airtable.com/v0/appIM03h0z55HyJ4S/employee?view=Grid%20view&filterByFormula={em_account}='" +
    userid +
    "'";
  async function fetchData() {
    const result = await axios.get(url, axios_config);
    console.log(result);
    try {
      if (password === result.data.records[0].fields.em_password) {
        localStorage.setItem("name", result.data.records[0].fields.em_name);
        localStorage.setItem("id", result.data.records[0].id);
        localStorage.setItem(
          "level",
          result.data.records[0].fields.em_position
        );
        console.log(localStorage.getItem("id"));
        console.log(localStorage.getItem("level"));
        result.data.records[0].fields.em_position === "B"
          ? history.push("/home/Name")
          : history.push("/home");
      } else {
        alert("密碼錯誤");
      }
    } catch (error) {
      alert("此帳號不存在，請重新登入");
      setUserid("");
      setPassword("");
    }
  }

  const login_temp = () => {
    history.push("/home");
  };

  return (
    <div className="container">
      <p>
        帳號{" "}
        <input
          id="userid"
          type="text"
          required
          placeholder="請輸入帳號"
          value={userid}
          onChange={(e) => setUserid(e.target.value)}
        />
      </p>
      <p>
        密碼{" "}
        <input
          id="password"
          type="password"
          required
          placeholder="請輸入密碼"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </p>
      <p>
        <Button id="loginbtn" variant="contained" onClick={fetchData}>
          登入
        </Button>
      </p>
    </div>
  );
}
