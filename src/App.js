// import React from "react";
// import Login from "./Login";
// import Rout from "./Rout";
// import Routing from "./Routing";

// function App() {
//   return (
//     <div className="App">
//      {/* <Rout/>    */}
//      <Routing/>
     
//     </div>
//   );
// }

// export default App;



import Routing from "./Routing";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer  } from 'react-toastify';
import './Style.css';
function App() {
  return (
    <div className="App">
      <Routing />
      <ToastContainer />
    </div>
  );
}

export default App;