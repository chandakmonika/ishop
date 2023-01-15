import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function FAQ_EditFAQ() {
  const storename = localStorage.getItem("USER_NAME")
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category_id, setCategory_id] = useState("");
  
  const [userdata, setUser_data] = useState({
    category_id: "",
    question: "",
    answer: "",
    
  });
  const { faq_id } = useParams();
  useEffect(() => {
    axios
      .get(
        `http://admin.ishop.sunhimlabs.com/api/v1/faq/details/${faq_id}`,{
          headers: {
            Accept: "application/json",
            "Content-Type": "Application/json",
            storename:storename,
          },
        }
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
    console.warn(category_id,question, answer);

    fetch(`http://admin.ishop.sunhimlabs.com/api/v1/faq/edit/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "Application/json",
        storename:storename,
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
      <h5 style={{ paddingLeft: "2rem" }}>FAQ Details</h5>
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
              <label for="exampleFormControlSelect1">FAQ Category</label>
              <select
                class="form-control"
                id="exampleFormControlSelect1"
                name="category_id"
                value={userdata.category_id}
                onChange={handleChange}
              >
                <option value="h">Home</option>
                <option value="a">About</option>
                
              </select>

              <label className="demo">Question</label>
              <input
                type="text"
                className="form-control"
                name="question"
                placeholder="Enter Last Name"
                value={userdata.question}
                onChange={handleChange}
              />

              <label className="demo">Answer</label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                placeholder="Enter Answer"
                rows="3"
                value={userdata.answer}
                onChange={handleChange}
                name="answer"
              ></textarea>
              <br />
            </div>

            <Link to="/mastermanagement/faq/list">
            <button type="button" class="btn btn-info" onClick={customerUser}>
              Update 
            </button>
            </Link>
           
            &nbsp;
          </form>

          <br />
        </div>
      </div>
    </div>
  );
}
