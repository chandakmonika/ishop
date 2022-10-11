import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export default function Master_StateList() {
  const [first, setFirst] = useState([]);
  const[stateData, setStateData] = useState([]);
  const [country, setCountry] = useState([]);
  const [states, setStates] = useState([]);
  const [country_id, setCountry_id] = useState("");
  const [query, setQuery] = useState({ text: "" });
  const [page, setPage] = useState([]);
  const [cpage, setCpage] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [state_id, setState_id] = useState([]);
  const [selectedcustomer, setSelectedcustomer] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("0");
  console.log(page);
  const url = "http://admin.ishop.sunhimlabs.com/api/v1/";
 
  useEffect(() => {
    axios.get(`${`http://admin.ishop.sunhimlabs.com/api/v1/`}/allcountries/`).then((res) => setCountry(res.data.data));
  }, []);


  // const handleChangePage = async (e, newPage) => {
  //   setCpage(newPage);
  //   try {
  //     const res = await axios.get(
  //       `${`http://admin.ishop.sunhimlabs.com/api/v1/`}/states/list/?country_id=${country_id}&q=${query.text}&page=${newPage}`
  //     );
  //     const { data, pages } = res.data;
  //     setStateData(data);
  //     setPage(pages);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    axios
      .get(
        `http://admin.ishop.sunhimlabs.com/api/v1/states/list/?country_id=`
      )
      .then((res) => setFirst(res.data.data));
  }, []);


  const handleChange = (e) => {
    setQuery({ text: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${url}/states/list/?country_id=${country_id}&q=${query.text}`
      );
      const { data, pages } = res.data;
      setStateData(data);
      setPage(pages);
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomerList = () => {
    axios
    .get(`http://admin.ishop.sunhimlabs.com/api/v1/countries/list/`)
      .then((res) => setStateData(res.data.data));
  };

  useEffect(() => {
    getCustomerList();
  }, []);

  const statusChange = (apidata) => {
    fetch("http://admin.ishop.sunhimlabs.com/api/v1/states/changestatus", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(apidata),
    }).then((result) => {
      result.json().then((resps) => {
        console.warn("resps", resps);
        getCustomerList();
        
      });
    });
  };

  function handleClick(state_id, status) {
    console.warn(state_id, status);
    let apidata = {
      state_id: state_id,
      status: status === "0" ? "1" : "0",
    };
    statusChange(apidata);
  }

  const onSelectCustomer = (e, state_id) => {
    const datas =
      first.length > 0 &&
      first.map((item) => {
        if (item.state_id === state_id) {
          return {
            ...item,
            isSelected: e.target.checked,
          };
        } else {
          return {
            ...item,
          };
        }
      });
      setStateData(datas);
    console.log(e.target.checked, state_id);
    const selectedData = datas.filter((item) => item.isSelected === true);
    console.log(selectedData, 10);
    setSelectedcustomer(selectedData);
  console.log(datas);
  };

  const applyStatus = () => {
    console.log(3, selectedcustomer, selectedStatus);
    const selectedId = selectedcustomer.map((id) => id.state_id).join(",");
    console.log(selectedId);
    const apidata = {
      country_id: selectedId,
      status: selectedStatus,
    };
    statusChange(apidata);
  };

  return (
    <div>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">State List</Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ml-auto my-4 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div class="card" style={{ width: "95%" }}>
        <div class="card-body" style={{ width: "100%" }}>
          <div class="row">
          <div className="col-sm-7">
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
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <select
                    class="form-control"
                    id="exampleFormControlSelect1"
                    onChange={(e) => {
                      setCountry_id(e.target.value);
                    }}
                    name="country_id"
                  >
                    {country.map((item) => {
                      return (
                        <option value={item.country_id}>
                          {item.country_name}
                        </option>
                      );
                    })}
                  </select>&nbsp;&nbsp;&nbsp;
                  <div class="input-group-append">
                    <Button variant="info" type="submit">
                      Search
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <br />
          <table class="table table-bordered" style={{ width: "95%" }}>
            <thead style={{ backgroundColor: "#EBF1F3" }}>
              <tr>
                <th scope="col">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customCheck1"
                      checked
                    />
                    <label
                      class="custom-control-label"
                      for="customCheck1"
                    ></label>
                  </div>
                </th>
                <th scope="col">State </th>
                <th scope="col">Country </th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>

              </tr>
            </thead>
            <tbody>
            {stateData &&
                stateData.length > 0 &&
                stateData.map((item) => {
                return (
                  <tr key={item.product_id}>
                    <td>
                
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    value={item.isSelected}
                    onChange={(e) => onSelectCustomer(e, item.state_id)}
                  />
                  <label for="customCheck{item.id}"></label>
                </div>
             
            </td>
                    <td>{item.state_name}</td>
                    <td>{item.country_name}</td>
                    <td><button
                          type="button"
                          onClick={() =>
                            handleClick(item.state_id, item.status)
                          }
                        >
                          {item.status === "0" ? "inactive" : "active"}
                        </button></td>
                    <td>
                      <Link to={`/mastermanagement/state/edit/${item.state_id}`}>
                        <i class="fas fa-edit" style={{ fontSize: "24px" }}></i>
                      </Link>
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
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  placeholder="Action"
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option selected>Action</option>
                  <option value={"1"}>Active</option>
                  <option value={"0"}>Inactive</option>
                  <option value={"2"}>Delete</option>
                </select>
              </div>
              <div className="col-md-4">
                <button
                  type="button"
                  class="btn btn-light"
                  style={{ width: "8rem" }}
                  onClick={() => applyStatus()}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
