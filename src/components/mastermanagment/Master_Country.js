import React,{ useState} from 'react'

export default function Master_Country() {
  const storename = localStorage.getItem("USER_NAME")
  const [country_name, setCountry_name] = useState("");


  function customerUser() {
    console.warn(country_name);
    let datas = {
      country_name  
    };
    fetch("http://admin.ishop.sunhimlabs.com/api/v1/countries/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "Application/json",
        storename:storename,
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
        <span>Add Country</span>
      </h4>
      <br />
      
        <div className="card" style={{ paddingLeft: "1rem", width:'70rem' }}>
          <br />
          <form onSubmit={submit} style={{ Display: "float-right" }}>

          <div
            className="form-group"
            controlId="formBasicFirstName"
            style={{ width: "50%" }}
          >
           <label className="demo">Country</label>
            <input
              type="text"
              className="form-control"
              placeholder="Add Country "
              value={country_name}
                onChange={(e) => {
                  setCountry_name(e.target.value);
                }}
                name="country_name"
            />
            <br />  
          </div>
          
          <button type="button" class="btn btn-info" onClick={customerUser}>
          Add Country
        </button>
          </form><br/>
          </div>
          </div>
  )
}
