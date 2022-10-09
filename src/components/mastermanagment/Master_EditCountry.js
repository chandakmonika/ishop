import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Master_EditCountry() {
  const [country_name, setCountry_name] = useState("");

  const [userdata, setUser_data] = useState({
    country_name: "",
  });
  const { country_id } = useParams();
  useEffect(() => {
    axios
      .get(
        `http://admin.ishop.sunhimlabs.com/api/v1/countries/details/${country_id}`
      )
      .then((res) => {
        const getData = res.data.data;
        console.log(getData);
        setUser_data(getData);
      });
  }, []);

  const handleChange = (e) => {
    console.log(e.target);

    setUser_data({
      ...userdata,
      [e.target.name]: e.target.value,
    });
  };

  function customerUser() {
    console.warn(country_name);

    fetch(`http://admin.ishop.sunhimlabs.com/api/v1/countries/edit`, {
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
      <h5 style={{ paddingLeft: "2rem" }}>Country Details</h5>
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
              style={{ width: "50%" }}
            >
              <label className="demo">Country</label>
              <input
                type="text"
                className="form-control"
                name="country_name"
                placeholder="Add Country"
                value={userdata.country_name}
                onChange={handleChange}
              />

              <br />
            </div>
<Link to = "/mastermanagement/country/list">
<button type="button" class="btn btn-info" onClick={customerUser}>
              Update Country
            </button>
</Link>
            
          </form>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}
