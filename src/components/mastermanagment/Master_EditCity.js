import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export default function Master_EditCity() {
  const [city_name, setCity_name] = useState("");
  // const [city_id, setCity_id] = useState("");
  const [state_id, setState_id] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countryId, setCountryId] = useState("");
  const [state_name, setState_name] = useState("");
  const [index, setIndex] = useState([]);
  const [indexs, setIndexs] = useState([]);
  const [userdata, setUser_data] = useState({
    city_name: "",
    // city_id: "",
    state_id: "",
  });
  const { city_id } = useParams();
  useEffect(() => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/cities/details/${city_id}`)
      .then((res) => {
        const getData = res.data.data;
        console.log(getData);
        setUser_data(getData);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/allstates/${countryId}`)
      .then((res) => setIndexs(res.data.data));
  }, [countryId]);

  useEffect(() => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/allcountries/`)
      .then((res) => setIndex(res.data.data));
  }, []);
  const handleChange = (e) => {
    console.log(e.target);

    setUser_data({
      ...userdata,
      [e.target.name]: e.target.value,
    });
  };

  function customerUser() {
    console.warn(city_name, state_id);

    fetch(`http://admin.ishop.sunhimlabs.com/api/v1/cities/edit/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(userdata),
    }).then((result) => {
      result.json().then((resps) => {
        console.warn("resps", resps);
      });
    });
  }
  const submit = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ paddingLeft: "10rem" }}>
      <h5 style={{ paddingLeft: "2rem" }}>City Details</h5>
      <div className="card" style={{ width: "50rem" }}>
        <div className="ind">
          <br />
          <form
            onSubmit={submit}
            style={{ Display: "float-right", paddingLeft: "2rem" }}
          >
            <div
              className="form-group"
              controlId="formBasicFirstName"
              style={{ width: "40%" }}
            >
              <label for="exampleFormControlSelect1">Country</label>
              <select
                class="form-control"
                id="exampleFormControlSelect1"
                onChange={(e) => {
                  setCountryId(e.target.value);
                }}
                name="country_id"
              >
                {index.map((item) => {
                  return (
                    <option value={item.country_id}>{item.country_name}</option>
                  );
                })}
              </select>
              <br />

              <label for="exampleFormControlSelect1">State</label>
              <select
                class="form-control"
                id="exampleFormControlSelect1"
                value={state_id}
                onChange={(e) => {
                  setState_id(e.target.value);
                }}
                name="state_id"
              >
                {indexs.map((item) => {
                  return (
                    <option value={item.state_id}>{item.state_name}</option>
                  );
                })}
              </select>
              <br />

              <label className="demo">City Name</label>
              <input
                type="text"
                className="form-control"
                name="city_name"
                placeholder="Enter City Name"
                value={userdata.city_name}
                onChange={handleChange}
              />
            </div>
            <button type="button" class="btn btn-info" onClick={customerUser}>
              Update Customer
            </button>
            &nbsp;
          </form>

          <br />
        </div>
      </div>
    </div>
  );
}
