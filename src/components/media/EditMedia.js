import React,{useState,useEffect} from "react"
import { Button, TextField } from "@mui/material"
import axios from "axios";

export const EditMedia=()=>{
    const [data,setData]=useState({text:"",title:"",caption:"",discription:"",url:""})
    const [newData,setNewData]=useState([])
    const getData=async()=>{
        const config = {
            headers: {
                storename: "kbtrends"
            }
        };
        const url="http://admin.ishop.sunhimlabs.com/api/v1/media/details/8"
        const result=await axios.get(url,config)
        setNewData(result.data&&result.data.data)
        console.log("this get data",newData)
    }
    const editMedia=()=>{
        const config = {
            headers: {
                storename: "kbtrends"
            }
        };
        const payload={
            "media_id" :data.text,
            "media_title" : data.title,
            "media_alt_text" : data.caption,
            "media_description" : data.discription,
            "media_caption" : data.url,
        };
        const url="http://admin.ishop.sunhimlabs.com/api/v1/media/edit"
        axios.post(url,payload,config)
    }
    // console.log("this is newData",data)
    useEffect(()=>{
        getData()
    },[])
return(
    <div>
        <h4>Edit Media File</h4>

        <div style={{display:"flex",border:"1px solid black",padding:"1rem"}} >
            <div>
                <img src="https://thumbs.dreamstime.com/b/fruit-basket-16191864.jpg" style={{width:"600px",height:"400px"}} />
            </div>
            <div style={{border:"1px solid black",padding:"1rem",width:"100%"}} >
                <div>
                    <label   >Alternative Text</label>
                    <TextField style={{width:"100%"}} 
                    onChange={(e)=>setData({...data,text:e.target.value})}
                    value={newData.media_alt_text}
                    />
                </div>
                <div>
                    <label   >Title</label>
                    <TextField style={{width:"100%"}}
                    value={newData.media_title}
                    onChange={(e)=>setData({...data,title:e.target.value})}
                    />
                </div>
                <div>
                    <label   >Caption</label>
                    <TextField style={{width:"100%"}}
                    value={newData.media_caption}
                    onChange={(e)=>setData({...data,caption:e.target.value})}
                    />
                </div>
                <div>
                    <label   >Description</label>
                    <TextField style={{width:"100%"}}
                    value={newData.media_description}
                    onChange={(e)=>setData({...data,discription:e.target.value})}
                    />
                </div>
                <div>
                    <label   >File URL</label>
                    <TextField style={{width:"100%"}}
                    value={newData.media_url}
                    onChange={(e)=>setData({...data,url:e.target.value})}/>
                </div>
                <Button onClick={editMedia} >Save</Button>
            </div>
        </div>
    </div>
)
}