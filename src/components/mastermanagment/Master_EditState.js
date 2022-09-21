import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export default function Master_EditState() {
  const [state_name, setState_name] = useState("");
  const [country_id, setCountry_id] = useState("");
  const [index, setIndex] = useState([]);
  const [country_name, setCountry_name] = useState("");
  useEffect(() => {
    axios
      .get(`http://admin.ishop.sunhimlabs.com/api/v1/allcountries/`)
      .then((res) => setIndex(res.data.data));
  }, []);

  const [userdata, setUserdata] = useState({
    state_name: "",
    country_name:"",
    country_id: "",
  });
  const { state_id } = useParams();
  useEffect(() => {
    axios
      .get(
        `http://admin.ishop.sunhimlabs.com/api/v1/states/details/${state_id}`
      )
      .then((res) => {
        const getData = res.data.data;
        console.log(getData);
        setUserdata(getData);
      });
  }, []);

  const handleChange = (e) => {
    console.log(e.target);

    setUserdata({
      ...userdata,
      [e.target.name]: e.target.value,
    });
  };

  function customerUser() {
    console.warn(state_name, country_id);

    fetch(`http://admin.ishop.sunhimlabs.com/api/v1/states/edit/`, {
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
      <h5 style={{ paddingLeft: "2rem" }}>State Details</h5>
      <div className="card" style={{ width: "50rem" }}>
        <div className="ind">
          <br />
          <form onSubmit={submit} style={{ Display: "float-right" }}>
            <div
              className="form-group"
              controlId="formBasic"
              style={{ width: "50%" }}
            >
              <label for="exampleFormControlSelect1">Country</label>
              <select
                class="form-control"
                id="exampleFormControlSelect1"
                name="country_id"
                value={userdata.country_id}
                onChange={handleChange}
              >
                {index.map((item) => {
                  return (
                    <option value={item.country_id}>{item.country_name}</option>
                  );
                })}
              </select>
              <br />

              <label className="demo">State </label>
              <input
                type="text"
                className="form-control"
                name="state_name"
                placeholder="Add State"
                value={userdata.state_name}
                onChange={handleChange}
              />
            </div>
            <br />
            <button type="button" class="btn btn-info" onClick={customerUser}>
              Update State
            </button>
          </form>
          <br />

          <br />
        </div>
      </div>
    </div>
  );
}
