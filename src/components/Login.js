import './components/Login.css'
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const loginFunction = () => {
    navigate("/home");
  };
  const loginContainer= {
    margin: 'auto',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
  return (
    <div
      style={loginContainer}
    >
      <div className="card" style={{ width: "30rem" }}>
        <div className="card-body" style={{ paddingRight: "200rm" }}>
          <p style={{ textAlign: "center" }}>Login From</p>

          <form onSubmit={loginFunction}>
            <div class="form-outline mb-4">
              <label class="form-label" for="form1Example1">
                Email address
              </label>
              <input type="email" id="form1Example1" class="form-control" required/>
            </div>

            <div class="form-outline mb-4">
              <label class="form-label" for="form1Example2">
                Password
              </label>
              <input type="password" id="form1Example2" class="form-control" required/>
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

            <button type="submit" class="btn btn-primary btn-block">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
