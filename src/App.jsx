import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
// const res= await axios.get(`https://dummyjson.com/users`);
// console.log(res);

function App() {
  let [userData, callMethod] = useState([]);
  useEffect(() => {
    axios
      .get("https://dummyjson.com/users")
      .then((res) => callMethod(res.data.users))
      .catch((err) => console.log(err));
  }, []);

  //Searching method
  const [value, setValue] =useState({
    search:'',
    filterData:[],
});
const searchUser=(e)=>{
    // console.log(e);
    // console.log(...props.userInfo)
    // let data=[...userData]
    let data=userData.filter(ele=>ele.firstName.toLowerCase().includes(e.target.value.toLowerCase()));
    setValue({search:e.target.value,filterData:data})
}

  // let [items, getItem]=useState([]);
  //atleast one time it will run;
  const printItem = (item) => {
    for (let a in item) {
      if (a == "firstName") {
        document.getElementById("userName").innerText = item[a];
      } else if (a == "lastName") {
        document.getElementById("userName").innerText += ` ${item[a]}`;
      } else if (a == "userAgent") {
        document.getElementById("userAgent").innerText = item[a];
      }
      //Now fatching address beacuse it is in object
      else if (a == "address") {
        for (let b in item[a]) {
          if (b == "address") {
            document.getElementById("userAddress").innerText = " " + item[a][b];
          } else if (b == "city") {
            document.getElementById("userCity").innerText = " " + item[a][b];
          } else if (b == "state") {
            document.getElementById("userState").innerText = " " + item[a][b];
          } else if (b == "postalCode") {
            document.getElementById("userPostal").innerText = " " + item[a][b];
          }
        }
      }
    }
  };
  return (
    <>
      <header>
      <input type='text' onChange={searchUser} maxLength='15' minLength='2' placeholder="Search..." autoFocus />
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Photo</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {
            value.filterData.length===0 && value.search===''? userData.map((item) => (
              <tr key={item.id} onClick={() => printItem(item)}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>
                  <img src={item.image} />
                </td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
              </tr>
            )):value.filterData.map((item) => (
              <tr key={item.id} onClick={() => printItem(item)}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>
                  <img src={item.image} />
                </td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <form>
          <h1>Details</h1>
          <p>Click on a table item to get detailed information</p>
          <hr />
          <span>
            <b>User Selected: </b>
            <span id="userName"></span>
          </span>
          <h4>Description</h4>
          <p id="description">
            <b>User Agent :</b>
            <span id="userAgent"></span>
          </p>
          <p>
            <b>Address :</b>
            <span id="userAddress"></span>
          </p>
          <p>
            <b>City :</b>
            <span id="userCity"></span>
          </p>
          <p>
            <b>State :</b>
            <span id="userState"></span>
          </p>
          <p>
            <b>Postal Code" :</b>
            <span id="userPostal"></span>
          </p>
        </form>
      </main>
      
    </>
  );
}

export default App;
