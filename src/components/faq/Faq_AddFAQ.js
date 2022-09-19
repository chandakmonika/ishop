import React,{ useState } from "react";

export default function Faq_AddFAQ() {
  const [category_id, setCategory_id] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");


  function customerUser() {
    console.warn(category_id,question,answer);
    let datas = { category_id,question,answer };
    fetch("http://admin.ishop.sunhimlabs.com/api/v1/faq/add", {
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
        <span>Add FAQ</span>
      </h4>
      <br />
      
        <div className="card" style={{ paddingLeft: "2rem", width:'68rem' }}>
          <br />
          <form onSubmit={submit} style={{ Display: "float-right" }}>
          <div
            className="form-group"
            controlId="formBasicFirstName"
            style={{ width: "50%" }}
          >
            <label for="exampleFormControlSelect1">FAQ Category</label>
            <select class="form-control" id="exampleFormControlSelect1" value={category_id}
              onChange={(e) => {
                setCategory_id(e.target.value);
              }}
              name="category_id">
              <option value="1">Home</option>
              <option value="1">About</option>
            </select >
            <br />

            <label className="demo">Question</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Add Question"
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
              name="question"
            />
            <br />

            <label className="demo">Answer</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" placeholder="Enter Answer" rows="3" value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
              name="answer"></textarea>
            <br />
          </div>
        
        <button type="button" class="btn btn-info" onClick={customerUser}>
          Add FAQ
        </button>
      </form><br/>
      </div>
    </div>
  );
}
