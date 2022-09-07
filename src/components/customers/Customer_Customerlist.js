import React,{ useEffect, useState }from 'react'
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Customer_Customerlist.css'
import { Link } from "react-router-dom";


export default function Customer_Customerlist() {
  const [index, setIndex] = useState([]);
  const [query, setQuery] = useState({ text: "" });
  console.log(query);
  const handleChange = (e) => {
    setQuery({ text: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://admin.ishop.sunhimlabs.com/api/v1/customer/list/?q=${query.text}`
      )
      .then((res) => setIndex(res.data.data));
  };
  useEffect(() => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/customer/list`)
      .then((res) => setIndex(res.data.data));
  }, []);
  

  return (
    <div>
       <Navbar expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Customer List</Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ml-auto my-4 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          <div className="d-flex ml-auto my-2 my-lg-0" >
            
            <Button variant="light">Import Customer</Button>&nbsp;&nbsp;&nbsp;
            <Button variant="info">Add Customer</Button>&nbsp;&nbsp;&nbsp;
          </div>&nbsp;&nbsp;&nbsp;
            
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div class="card" style={{width:'100%'}}>
  <div class="card-body" style={{width:'100%'}}> 
<div class='row' >
    <div className='col-sm-3' >
    <form onSubmit={handleSubmit}>
                <div class="input-group">
                  <input
                    type="text"
                    name="search"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="texthelp"
                    placeholder="Search this blog"
                    onChange={handleChange}
                  />
                  <Button variant="info" type="submit">
                      Search
                    </Button>
                  </div>
                  </form>
</div>
</div><br/>
<table class="table table-bordered" style={{width:'95%',}}>
        <thead style={{backgroundColor: '#EBF1F3',}}>
          <tr>
            <th scope="col"><div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="customCheck" checked/>
                  <label class="custom-control-label" for="customCheck"></label>
              </div></th>
            <th scope="col">Customer Name</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Email</th>
            <th scope="col">Orders Place</th>
            <th scope="col">Total Sales</th>
            <th scope="col">Address</th>
          </tr>
        </thead>
        <tbody>
              {index.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="customCheck2"
                        />
                        <label
                          class="custom-control-label"
                          for="customCheck2"
                        ></label>
                      </div>
                    </td>
                    <td>{item.first_name} {item.last_name}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td></td>
                    <td></td>
                    <td><Link to="/customer/address/list" ><i class="fa fa-address-book" style={{fontSize:'24px'}}></i></Link>&nbsp;&nbsp;
                    <Link to="/customer/edit/{item.user_id}"><i class="fas fa-edit"  style={{fontSize:'24px'}}></i></Link>
                    
                    
                    
                    </td>
                  </tr>
                );
              })}
            </tbody>
      </table>
      {/* <-------------------------TableEnd----------------------> */}
     
      <div class="text-left">
            <div className="row">
              <div className="col-md-2">
                {/* <label for="exampleFormControlSelect1">Action</label> */}
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  placeholder="Action"
                >
                  <option selected>Action</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <div className="col-md-4">
                <button
                  type="button"
                  class="btn btn-light"
                  style={{ width: "8rem" }}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
           </div></div>
    </div>
  )
}
