import './App.css';
import useFetch from "./useFetch.js";
import React, {useEffect, useState} from "react"
import axios from "axios";


export default function App() {
  
const{data,loading,error} = useFetch("http://localhost:3001/tasks")  
  
if (loading) return <h1>Loading</h1>

if (error) console.log(error)



return(<Credentials data={data}/>
)  


}


function Credentials({data}){
  
console.log("data", data)
return (<div>
<li>id:{data? data[0].id : "undefined"} </li>
<li>name:{data? data[0].name : "undefined"}</li>
<li>email:{data? data[0].email : "undefined"} </li>
</div>)
}


