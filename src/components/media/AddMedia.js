import React from "react"
import axios from "axios"

export const AddMedia= () => {
 const handelupload=async(e)=>{
    const config = {
        headers: {
            storename: "kbtrends"
        }
    };
    const formdata=new FormData()
    Array.from(e.target.files).forEach(image => {
        formdata.append("media_data", image);
    });
    await axios.post(`${process.env.REACT_APP_BACKEND_APIURL}api/v1/media/add`,formdata,config)
 }
    return(
        <div>
            <h3>Media</h3>
               <div>
                <h5>Add Media</h5>
                <div style={{height:"400px",width:"700px",border:"solid 1px black",display:"flex",justifyContent:"center",alignItems:"center"}} >
                    <input type="file" style={{border:"1px dashed black",height:"200px",width:"400px"}} onChange={(e)=>handelupload(e)} multiple />
                </div>
            </div>
        </div>
    )
}