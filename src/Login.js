import React from "react";
import {Link } from "react-router-dom";

export default function Login() {
  return (
    <div style={{ textAlign: "center", paddingLeft: "30rem" }}>
      <div className="card" style={{ width: "30rem" }}>
        <div className="card-body" style={{ paddingRight: "200rm" }}>
          <p style={{ textAlign: "center" }}>Sign in to start your session</p>

          <form>
            <div class="form-outline mb-4">
              <label class="form-label" for="form1Example1">
                Email address
              </label>
              <input type="email" id="form1Example1" class="form-control" />
            </div>

            <div class="form-outline mb-4">
              <label class="form-label" for="form1Example2">
                Password
              </label>
              <input type="password" id="form1Example2" class="form-control" />
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
            <Link to="/storedetails" >
            <button type="submit" class="btn btn-primary btn-block">
              Sign in
            </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
