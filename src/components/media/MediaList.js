import React,{useState,useEffect} from "react"
import axios from "axios"
import { Card } from "@mui/material"
export const MediaList=()=>{
    const [data,setData]=useState([])
    const getData=async()=>{
     const config = {
            headers: {
                storename: "kbtrends"
            }
        };
        
     const result=await axios.get(`${process.env.REACT_APP_BACKEND_APIURL}api/v1/media/list?page=1&q=abc&media_type=i`,config)
     setData(result.data.data)
    }
    useEffect(()=>{
        getData()
    },[])
    return(
        <div>
            {
                data.length>0&&data.map(item=>
                    <Card style={{width:"200px"}}>
                        <div  >  
                        <img src={item.media_url} />
                        <h6>Title : {item.media_title}</h6>
                        <h6>Description : {item.media_description}</h6>
                        <h6>Caption : {item.media_caption}</h6>
                        </div>             
                    </Card>
                )
            }
        </div>
    )
}