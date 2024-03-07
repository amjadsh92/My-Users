import './App.css';
import useFetchPost from "./useFetchPost.js";
import React, {useEffect, useState} from "react"
import axios from "axios";


export default function App() {

const [cred, setCred] = useState({name:"", email:""})

const handleChange = (e) => {

  setCred({...cred, [e.target.name]: e.target.value})
}


const handleSubmit =  (url, postdata) => {

  axios.post(url, postdata).then((response) => {
    console.log("This has been posted", response.data);
}).catch((error) => {
    console.log(error);

}).finally(() => {
    console.log(false)
})

};



return (
  <form onSubmit={() =>handleSubmit("http://localhost:3001/users", cred)}>
    <label>
      Name:
      <input type="text" name="name" value={cred.name} onChange={handleChange} />
    </label>
    <br />
    <label>
      email:
      <input type="text" name="email" value={cred.email} onChange={handleChange} />
    </label>
    <br />
    <button type="submit">Add Post</button>
  </form>
);



} 
  







