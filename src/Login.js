// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, Navigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   //   const loginSubmit = () =>{
//   // window.localStorage.setItem("isLogingged",true)
//   // Navigate("/routing");
//   //   }
//   const [username, setUsername] = useState("");
//   const [password, setpassword] = useState("");

//   function customerUser() {
//     console.warn(username, password);

//     let datas = {
//       username,
//       password,
//     };
//     fetch("http://admin.ishop.sunhimlabs.com/api/v1/user/login", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "Application/json",
//       },
//       body: JSON.stringify(datas),
//     }).then((result) => {
//       result.json().then((response) => {
//         console.warn("response", response);
//       });
//     });
//   }
//   const submit = (e) => {
//     e.preventDefault();
//   };
//   return (
//     <div
//       style={{ textAlign: "center", paddingLeft: "30rem", marginTop: "10rem" }}
//     >
//       <div className="card" style={{ width: "30rem" }}>
//         <div className="card-body" style={{ paddingRight: "200rm" }}>
//           <p style={{ textAlign: "center" }}>Sign in to start your session</p>

//           <form onSubmit={submit}>
//             <div className="form-group" controlId="formBasicFirstName">
//               <div class="form-outline mb-4">
//                 <label class="form-label">Email address</label>
//                 <input
//                   type="text"
//                   class="form-control"
//                   value={username}
//                   onChange={(e) => {
//                     setUsername(e.target.value);
//                   }}
//                   name="username"
//                 />
//               </div>

//               <div class="form-outline mb-4">
//                 <label class="form-label">Password</label>
//                 <input
//                   type="password"
//                   class="form-control"
//                   value={password}
//                   onChange={(e) => {
//                     setpassword(e.target.value);
//                   }}
//                   name="password"
//                 />
//               </div>

//               <div class="row mb-4">
//                 <div class="col d-flex justify-content-center">
//                   <div class="form-check">
//                     <input
//                       class="form-check-input"
//                       type="checkbox"
//                       value=""
//                       id="form1Example3"
//                       unchecked
//                     />
//                     <label class="form-check-label" for="form1Example3">
//                       Remember me
//                     </label>
//                   </div>
//                 </div>

//                 <div class="col">
//                   <Link to="/forgetpassword">Forgot password?</Link>
//                 </div>
//               </div>
//               <Link to="/routing">
//                 <button
//                   type="submit"
//                   class="btn btn-primary btn-block"
//                   onClick={customerUser}
//                 >
//                   Sign in
//                 </button>
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );


// ----------------------------------------------------Login Code---------------------------------------------
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const loginFunction = () => {
    navigate("/home");
  };
  return (
    <div
      style={{ textAlign: "center", paddingLeft: "30rem", marginTop: "10rem" }}
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

// --------------------------------formik Code----------------------------------------

// import { Formik } from 'formik';

// const LoginPage = () => (
//   <div>
//     <h1>Anywhere in your app!</h1>
//     <Formik
//       initialValues={{ email: '', password: '' }}
//       validate={values => {
//         const errors = {};
//         if (!values.email) {
//           errors.email = 'Required';
//         } else if (
//           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
//         ) {
//           errors.email = 'Invalid email address';
//         }
//         return errors;
//       }}
//       onSubmit={(values, { setSubmitting }) => {
//         setTimeout(() => {
//           alert(JSON.stringify(values, null, 2));
//           setSubmitting(false);
//         }, 400);
//       }}
//     >
//       {({
//         values,
//         errors,
//         touched,
//         handleChange,
//         handleBlur,
//         handleSubmit,
//         isSubmitting,
//         /* and other goodies */
//       }) => (
//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             name="email"
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.email}
//           />
//           {errors.email && touched.email && errors.email}
//           <input
//             type="password"
//             name="password"
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.password}
//           />
//           {errors.password && touched.password && errors.password}
//           <button type="submit" disabled={isSubmitting}>
//             Submit
//           </button>
//         </form>
//       )}
//     </Formik>
//   </div>
// );

// export default LoginPage ;