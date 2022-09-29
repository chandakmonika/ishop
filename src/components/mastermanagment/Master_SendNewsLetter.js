import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Master_CMSEditor from './Master_CMSEditor';
const config = {
    buttons: [
      "bold",
      "italic",
      "underline",
      "link",
      "unlink",
      "source",
      "paragraph",
      "image",
      "video",
      "table",
      "search",
      "file",
      "preview",
      "align",
      "undo",
      "redo",
      "fullsize",
      "dots",
      "copyformat",
      "hr",
      "brush",
      "fontsize",
    ],
  };
export default function Master_SendNewsLetter() {
  const [value, setValue] = useState("");
  const [email_title, setEmail_title] = useState("");
  const [from_name, setFrom_name] = useState("");
  const [from_email, setFrom_email] = useState("");
  const [email_subject, setEmail_subject] = useState("");
  const [email_content, setEmail_content] = useState([]);
 const [userdata, setUser_data] = useState({
  email_title: "",
    from_name: "",
    from_email: "",
    email_subject: "",
    email_content: "",
  });
  const { template_id } = useParams();
  useEffect(() => {
    axios
      .get(
        `http://admin.ishop.sunhimlabs.com/api/v1/newsletter/templates/details/${template_id}`
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
    console.warn(email_title, from_name, from_email,email_subject,email_content);

    fetch(`http://admin.ishop.sunhimlabs.com/api/v1/newsletter/templates/edit/`, {
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
      <div style={{ paddingLeft: "4rem" }}>
        <br />
        <h4 style={{ paddingLeft: "2rem" }}>
          <span>Send NewsLetter</span>
        </h4>
        <br />
        <div className="card" style={{ paddingLeft: "1rem", width:'70rem' }}>
          <br />
          <div className="ind">
          <br />
          <form
            onSubmit={submit}
            style={{ Display: "float-right",  }}
          >
            <div
              className="form-group"
              controlId="formBasicFirstName"
              style={{ width: "60%" }}
            >
             <label className="demo">Title</label>
              <input
                type="text"
                className="form-control"
                name="email_title"
                placeholder="Enter Email Title"
                value={userdata.email_title}
                onChange={handleChange}
              />
              <br />  
  
              <label className="demo">From Name</label>
              <input
                type="text"
                className="form-control"
                name="from_name"
                placeholder="Enter Email Title"
                value={userdata.from_name}
                onChange={handleChange}
              />
              <br /> 
  
              <label className="demo">From Email</label>
              <input
                type="text"
                className="form-control"
                name="from_email"
                placeholder="Enter Email Title"
                value={userdata.from_email}
                onChange={handleChange}
              />
              <br /> 
  
              <label className="demo">Email Subject</label>
              <input
                type="text"
                className="form-control"
                name="email_subject"
                placeholder="Enter Email Title"
                value={userdata.email_subject}
                onChange={handleChange}
              />
              <br /> 

              <label className="demo">Send To</label>
              <input
                type="text"
                className="form-control"
                placeholder="Add Send To Email"
                name="add_question"
              />
              
              <br /> 
  
              <h6>Email Content</h6>
                  <Master_CMSEditor setValue={setValue} config={config} />
                  <br />
                  
            </div>
          
            <button type="button" class="btn btn-info" onClick={customerUser}>
              Send
            </button>
            </form><br/>
            </div>
          </div>
          </div>
  )
}
