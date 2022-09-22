import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export default function Master_StateList() {
  const [first, setFirst] = useState([]);
  const [country, setCountry] = useState([]);
  const [states, setStates] = useState([]);
  const [country_id, setCountry_id] = useState("");
  const [state_id, setState_id] = useState("");
  const [query, setQuery] = useState({ text: "" });
  const [page, setPage] = useState([]);
  const [cpage, setCpage] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  console.log(page);
  const url = "http://admin.ishop.sunhimlabs.com/api/v1/";
  // useEffect(() => {
  //   axios
  //     .get(`${`http://admin.ishop.sunhimlabs.com/api/v1/`}/allstates/${country_id}`)
  //     .then((res) => setStates(res.data.data));
  // }, [country_id]);

  useEffect(() => {
    axios.get(`${`http://admin.ishop.sunhimlabs.com/api/v1/`}/allcountries/`).then((res) => setCountry(res.data.data));
  }, []);
  const handleChangePage = async (e, newPage) => {
    setCpage(newPage);
    try {
      const res = await axios.get(
        `${`http://admin.ishop.sunhimlabs.com/api/v1/`}/states/list/?country_id=${country_id}&q=${query.text}&page=${newPage}`
      );
      const { data, pages } = res.data;
      setFirst(data);
      setPage(pages);
    } catch (error) {
      console.log(error);
    }
  };

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
      setFirst(data);
      setPage(pages);
    } catch (error) {
      console.log(error);
    }
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
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {first.map((item) => {
                return (
                  <tr key={item.product_id}>
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
                    <td>{item.state_name}</td>
                    <td>{item.country_name}</td>
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
        </div>
      </div>
    </div>
  );
}
