
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Dashboard.css';

function Dashboard() {
  return (
    <>
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">iSHOP</Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ml-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          <Form className="d-flex ml-auto my-2 my-lg-0" >
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>&nbsp;&nbsp;&nbsp;
          <Nav.Link href="#action1"> <i className="fas fa-user-alt"></i></Nav.Link>
          <NavDropdown title="User Name" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Login</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Logout
              </NavDropdown.Item>
            </NavDropdown>   
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className="sidenav">
        <ul class="mainmenus">
        <li> <a href="/">
          <i className="fa fa-home"></i>&nbsp;Home</a>
        </li>
        <li>
        <a href="/">
          <i className="fa fa-address-book"></i>&nbsp;Orders</a>
        </li>
       <li>
       <a href="#delivery">
          <i className="fa fa-ad"></i>&nbsp;Delivery
        </a></li> 
       <li>
       <a href="product">
          <i className="fa fa-map-pin"></i>&nbsp;Products
        </a>
        <ul class="submenu">
        <li><a href="/">Product List</a></li>
        <li><a href="/">Add Product</a></li>
      </ul>
       </li>
        <li>
        <a href="customer">
          <i className="fas fa-user-alt"></i>&nbsp;Customers
        </a>
        </li>
      <li>
      <a href="analytics">
          <i className="fa fa-address-book"></i>&nbsp;Analytics
        </a></li>  
        <li>
        <a href="marketing">
          <i className="fas fa-ad" style={{color: "grey"}}></i>&nbsp;Marketing
        </a>
        </li>
       <li>
       <a href="themes">
          <i className="fa fa-book"></i>&nbsp;Themes
        </a></li> 
      <li><a href="disscount">
          <i className="fas fa-user-alt"></i>&nbsp;Disscount
        </a></li>  
       <li>
       <a href="payment">
          <i className="fa fa-map-pin"></i>&nbsp;Payment
        </a></li> 
        </ul>
        
      </div>
    

    </>
  );
}

export default Dashboard;
