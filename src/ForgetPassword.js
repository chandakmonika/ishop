import React from 'react'
import { Link } from 'react-router-dom'

export default function ForgetPassword() {
  return (
   
      <div style={{ textAlign: "center", paddingLeft: "30rem",marginTop:'10rem' }}>
      <div className="card" style={{ width: "30rem" }}>
        <div className="card-body" style={{ paddingRight: "200rm" }}>
          <p style={{ textAlign: "center" }}>You forgot your password? Here you can easily retrieve a new password.</p>

          <form>
            <div class="form-outline mb-4">
              <label class="form-label" for="form1Example1">
                Email address
              </label>
              <input type="email" id="form1Example1" class="form-control" />
            </div>

            <button type="submit" class="btn btn-primary btn-block">
              Request New Password
            </button>
          </form>
        </div>
      </div>
    </div>
   
  )
}
