import axios from "axios";


import './App.css';
import useFetch from "./useFetch";



function App() {

const {data, loading, error} = useFetch(url.com)

return(
<div className="App">
  <ul >
      <li>id: {data.id}</li>
      <li>name: {data.name}</li>
      <li>email: {data.description} </li>
  </ul>



</div>
)

}

export default App;

