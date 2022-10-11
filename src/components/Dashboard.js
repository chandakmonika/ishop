// import React, { useState } from "react";
// import Button from "react-bootstrap/Button";

// import "./Dashboard.css";
// export default function Dashboard() {
//   const [showText, setShowText] = useState(false);
//   const onClick = () => setShowText(true);

//   return (
//     <div style={{ paddingLeft: "4rem" }}>
//       <br />
//       <h5 style={{ paddingLeft: "2rem" }}>Subscribtion Plan</h5>
//       <div className="card" style={{ width: "70rem" }}>
//         <div className="card-body">
//           <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet</p>

//           <label class="switch">
//             <input class="switch-input" type="checkbox" />
//             <span
//               class="switch-label"
//               data-on="Monthly"
//               data-off="yearly"
//             ></span>
//             <span class="switch-handle"></span>
//           </label>
//           <br />
//           <div className="row">
//             <div className="col-md-4">
//               <div className="card">
//                 <div className="card-body">
//                   <p>Silver Plan</p>
//                   <p>Reference site about Lorem</p>
//                   <h6>
//                     $600<span>/month</span>
//                   </h6>
//                   <ul className="index">
//                     <li>Reference site about Lorem</li>
//                     <li>Reference site Lorem</li>
//                     <li>Reference site </li>
//                   </ul>
//                   <div
//                     class="input-group-append"
//                     style={{ marginLeft: "7rem" }}
//                   >
//                     <Button variant="info" type="submit">
//                       Subscribe
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="col-md-4">
//               <div className="card">
//                 <div className="card-body">
//                   <p>Silver Plan</p>
//                   <p>Reference site about Lorem</p>
//                   <h6>
//                     $600<span>/month</span>
//                   </h6>
//                   <ul className="index">
//                     <li>Reference site about Lorem</li>
//                     <li>Reference site Lorem</li>
//                     <li>Reference site </li>
//                   </ul>
//                   <div
//                     class="input-group-append"
//                     style={{ marginLeft: "7rem" }}
//                   >
//                     <Button variant="info" type="submit">
//                       Subscribe
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="col-md-4">
//               <div className="card">
//                 <div className="card-body">
//                   <p>Silver Plan</p>
//                   <p>Reference site about Lorem</p>
//                   <h6>
//                     $600<span>/month</span>
//                   </h6>
//                   <ul className="index">
//                     <li>Reference site about Lorem</li>
//                     <li>Reference site Lorem</li>
//                     <li>Reference site </li>
//                   </ul>
//                   <div
//                     class="input-group-append"
//                     style={{ marginLeft: "7rem" }}
//                   >
//                     <Button variant="info" type="submit">
//                       Subscribe
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <br />
//           <button onClick={onClick} style={{ marginLeft: "25rem" }}>
//             Show Plan Features
//           </button>
//           {showText ? <Text /> : null}
//         </div>

//         <br /><br/>
//       </div>
//     </div>
//   );
// }
// const Text = () => (
//   <div>
//     <table class="table table-bordered" style={{ width: "95%" }}>
//       <thead >
//         <tr>
//           <th scope="col"></th>
          

//           <th scope="col">
//             <p style={{ textAlign: "center" }}>Silver</p>
//             <p style={{ textAlign: "center" }}>$5690</p>
//             <Button variant="info" type="submit" style={{ marginLeft: "4rem" }}>
//               Subscribe
//             </Button>
//           </th>
//           <th scope="col">
//             <p style={{ textAlign: "center" }}>Silver</p>
//             <p style={{ textAlign: "center" }}>$5690</p>
//             <Button variant="info" type="submit" style={{ marginLeft: "4rem" }}>
//               Subscribe
//             </Button>
//           </th>
//           <th scope="col">
//             <p style={{ textAlign: "center" }}>Silver</p>
//             <p style={{ textAlign: "center" }}>$5690</p>
//             <Button variant="info" type="submit" style={{ marginLeft: "4rem" }}>
//               Subscribe
//             </Button>
//           </th>
//         </tr>
//       </thead>
//       <tbody >
//         <tr>
         
//           <td>Products</td>
//           <td style={{textAlign:'center'}}><i class="fa fa-check"></i></td>
//           <td style={{textAlign:'center'}}><i class="fa fa-check"></i></td>
//           <td style={{textAlign:'center'}}><i class="fa fa-check"></i></td>
        
//         </tr>
//         <tr>
         
//           <td>Custom Domian</td>
//           <td style={{textAlign:'center'}}>-</td>
//           <td style={{textAlign:'center'}}>FREE<br/>
//             <span>1st year free</span>
//           </td>
//           <td style={{textAlign:'center'}}>FREE<br/>
//             <span>1st year free</span>
//           </td>
        
//         </tr>
//         <tr>
          
//           <td>Chiline Store<br/>
//           <span>And product categoty and more</span>
//           </td>
//           <td style={{textAlign:'center'}}>-</td>
//           <td style={{textAlign:'center'}}><i class="fa fa-check"></i></td>
//           <td style={{textAlign:'center'}}><i class="fa fa-check"></i></td>
          
//         </tr>
//       </tbody>
//     </table>
//   </div>
// );







// ------------------------------------------Dashboard----------------------------------------------
import React, { useState } from "react";
import Button from "react-bootstrap/Button";

import "./Dashboard.css";
export default function DashboardHome() {
  const [showText, setShowText] = useState(false);
  const onClick = () => setShowText(true);

  return (
    <div style={{ paddingLeft: "4rem" }}>
      <br />
      <h5 style={{ paddingLeft: "2rem" }}>Subscribtion Plan</h5>
      <div className="card" style={{ width: "70rem" }}>
        <div className="card-body">
          <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet</p>

          <label class="switch">
            <input class="switch-input" type="checkbox" />
            <span
              class="switch-label"
              data-on="Monthly"
              data-off="yearly"
            ></span>
            <span class="switch-handle"></span>
          </label>
          <br />
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <p>Silver Plan</p>
                  <p>Reference site about Lorem</p>
                  <h6>
                    $600<span>/month</span>
                  </h6>
                  <ul className="index">
                    <li>Reference site about Lorem</li>
                    <li>Reference site Lorem</li>
                    <li>Reference site </li>
                  </ul>
                  <div
                    class="input-group-append"
                    style={{ marginLeft: "7rem" }}
                  >
                    <Button variant="info" type="submit">
                      Subscribe
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <p>Silver Plan</p>
                  <p>Reference site about Lorem</p>
                  <h6>
                    $600<span>/month</span>
                  </h6>
                  <ul className="index">
                    <li>Reference site about Lorem</li>
                    <li>Reference site Lorem</li>
                    <li>Reference site </li>
                  </ul>
                  <div
                    class="input-group-append"
                    style={{ marginLeft: "7rem" }}
                  >
                    <Button variant="info" type="submit">
                      Subscribe
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <p>Silver Plan</p>
                  <p>Reference site about Lorem</p>
                  <h6>
                    $600<span>/month</span>
                  </h6>
                  <ul className="index">
                    <li>Reference site about Lorem</li>
                    <li>Reference site Lorem</li>
                    <li>Reference site </li>
                  </ul>
                  <div
                    class="input-group-append"
                    style={{ marginLeft: "7rem" }}
                  >
                    <Button variant="info" type="submit">
                      Subscribe
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <button onClick={onClick} style={{ marginLeft: "25rem" }}>
            Show Plan Features
          </button>
          {showText ? <Text /> : null}
        </div>

        <br />
        <br />
      </div>
    </div>
  );
}
const Text = () => (
  <div>
    <table class="table table-bordered" style={{ width: "95%" }}>
      <thead>
        <tr>
          <th scope="col"></th>

          <th scope="col">
            <p style={{ textAlign: "center" }}>Silver</p>
            <p style={{ textAlign: "center" }}>$5690</p>
            <Button variant="info" type="submit" style={{ marginLeft: "4rem" }}>
              Subscribe
            </Button>
          </th>
          <th scope="col">
            <p style={{ textAlign: "center" }}>Silver</p>
            <p style={{ textAlign: "center" }}>$5690</p>
            <Button variant="info" type="submit" style={{ marginLeft: "4rem" }}>
              Subscribe
            </Button>
          </th>
          <th scope="col">
            <p style={{ textAlign: "center" }}>Silver</p>
            <p style={{ textAlign: "center" }}>$5690</p>
            <Button variant="info" type="submit" style={{ marginLeft: "4rem" }}>
              Subscribe
            </Button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Products</td>
          <td style={{ textAlign: "center" }}>
            <i class="fa fa-check"></i>
          </td>
          <td style={{ textAlign: "center" }}>
            <i class="fa fa-check"></i>
          </td>
          <td style={{ textAlign: "center" }}>
            <i class="fa fa-check"></i>
          </td>
        </tr>
        <tr>
          <td>Custom Domian</td>
          <td style={{ textAlign: "center" }}>-</td>
          <td style={{ textAlign: "center" }}>
            FREE
            <br />
            <span>1st year free</span>
          </td>
          <td style={{ textAlign: "center" }}>
            FREE
            <br />
            <span>1st year free</span>
          </td>
        </tr>
        <tr>
          <td>
            Chiline Store
            <br />
            <span>And product categoty and more</span>
          </td>
          <td style={{ textAlign: "center" }}>-</td>
          <td style={{ textAlign: "center" }}>
            <i class="fa fa-check"></i>
          </td>
          <td style={{ textAlign: "center" }}>
            <i class="fa fa-check"></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);