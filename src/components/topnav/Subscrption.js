import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Subscrption.css'
export default function Subscrption() {
  return (
    <div style={{ paddingLeft: "4rem" }}><br/>
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <dl>
                <dd>
                <Link to="/storedetails" >
                  <i className="fa fa-address-book"></i>&nbsp;&nbsp;&nbsp;
                  <span>Store Details</span>
                  </Link>
                </dd>
                <hr></hr>
                <dd>
                <Link to="/account/subscrption" >
                  <i className="fa fa-address-book"></i>&nbsp;&nbsp;&nbsp;
                  <span>Subscrption</span>
                  </Link>
                </dd>
                <hr></hr>
                <dd>
                  <i className="fa fa-address-book"></i>&nbsp;&nbsp;&nbsp;
                  <span>Invoices</span>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className='col-md-8'>
            <h5>Subscription</h5>
<div className='card'>
    <div className='card-body'>
        <p style={{textAlign:"left"}}>Plan Details</p>
        <p>You are currently in Dukan Trial</p>
        <p>Your free trail plan will expire on Sep 22,2022</p>
<Link to="/dashboard">
        <Button variant="info" type="submit">
                      Subscribe
                    </Button></Link>
    </div>
</div>
        </div>
    </div>
    </div>
  )
}
