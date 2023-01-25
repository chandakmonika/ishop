// ----------------------------------------------------Login Code---------------------------------------------
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const storename = localStorage.getItem("USER_NAME")

  const navigate = useNavigate();
  const loginFunction = (e) => {
    e.preventDefault();
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login_device, setlogin_device] = useState("");
  const [device_details, setdevice_details] = useState("");

  function customerUser() {
    console.warn(username, password, login_device, device_details);

    let datas = {
      username,
      password,
      login_device,
      device_details,
    };

    fetch(`${process.env.REACT_APP_BACKEND_APIURL}api/v1/user/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "Application/json",
        storename:storename,
      },
      body: JSON.stringify(datas),
    }).then((result) => {
      result.json().then((response) => {
        console.warn("response", response);
        if (response && response.token) {
          localStorage.setItem("ACCESS_TOKEN", response.token);
          localStorage.setItem("USER_NAME", response.username);
          localStorage.setItem("USER_ID", response.user_id);

          setTimeout(() => {
            navigate("/home");

            // window.location.reload();
          }, 100);
        }
      });
    });
  }

  return (
    <div
      style={{ textAlign: "center", paddingLeft: "30rem", marginTop: "10rem" }}
    >
      <div className="card" style={{ width: "30rem" }}>
        <div className="card-body" style={{ paddingRight: "200rm" }}>
          <p style={{ textAlign: "center" }}>Login From</p>
          <form>
            <div class="form-outline mb-4">
              <label class="form-label" for="form1Example1">
                User Name
              </label>
              <input
                type="email"
                id="form1Example1"
                class="form-control"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                name="username"
                required
              />
            </div>

            <div class="form-outline mb-4">
              <label class="form-label" for="form1Example2">
                Password
              </label>
              <input
                type="password"
                id="form1Example2"
                class="form-control"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                name="password"
                required
              />
            </div>

            <div class="row mb-4">
              <div class="col d-flex justify-content-center">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="form1Example3"
                    unchecked
                  />
                  <label class="form-check-label" for="form1Example3">
                    Remember me
                  </label>
                </div>
              </div>

              <div class="col">
                <Link to="/forgetpassword">Forgot password?</Link>
              </div>
            </div>

            <button type="button" class="btn btn-info" onClick={customerUser}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
