import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Master_City() {
  const [countryName, setCountryName] = useState("");
  const [countryId, setCountryId] = useState("");
  const [state_id, setState_id] = useState("");
  const [state_name, setState_name] = useState("");
  const [city_name, setCity_name] = useState("");
  const [index, setIndex] = useState([]);
  const [indexs, setIndexs] = useState([]);
  console.log(indexs);

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

  function customerUser() {
    console.warn(countryName, state_name, state_id, city_name);
    let datas = {
      countryName,
      state_name,

      state_id,
      city_name,
    };
    fetch("http://admin.ishop.sunhimlabs.com/api/v1/cities/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(datas),
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
    <div style={{ paddingLeft: "4rem" }}>
      <br />
      <h4 style={{ paddingLeft: "2rem" }}>
        <span>Add City</span>
      </h4>
      <br />

      <div className="card" style={{ paddingLeft: "1rem", width: "70rem" }}>
        <br />
        <form onSubmit={submit} style={{ Display: "float-right" }}>
          <div
            className="form-group"
            controlId="formBasicFirstName"
            style={{ width: "50%" }}
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
                return <option value={item.id}>{item.country_name}</option>;
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
                return <option value={item.id}>{item.state_name}</option>;
              })}
            </select>
            <br />

            <label className="demo">City Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter City"
              value={city_name}
              onChange={(e) => {
                setCity_name(e.target.value);
              }}
              name="city_name"
            />
          </div>
          <br />
          <button type="button" class="btn btn-info" onClick={customerUser}>
            Add City
          </button>
        </form>
        <br />
      </div>
    </div>
  );
}
