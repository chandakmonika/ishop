import React from 'react'
import './Customer_emptydata.css';
// import customer from '/src/images/customer-page.jpg';
export default function Customer_emptydata() {
  return (
    <div>  
      <div class="card">
  <div class="card-body">
{/* <img src={customer} /> */}
    <h5 class="card-title">Add New Customers</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    
    <button type="button" class="btn btn-light">Import Customers</button>&nbsp;&nbsp;&nbsp;&nbsp;
    <button type="button" class="btn btn-info">Add Customers</button>

  </div>
</div>
    </div>
  )
}
