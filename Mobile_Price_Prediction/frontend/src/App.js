import './App.css';
import axios from 'axios'
import { useState } from 'react'


const url = 'http://127.0.0.1:5000/api'

function App() {

  const [Price, setPrice] = useState("NULL")
  const [RAM, setRAM] = useState('');
  const [ROM, setROM] = useState('');
  const [Rating, setRating] = useState('');
  const [Battery, setBattery] = useState('');
  const [Display, setDisplay] = useState('');
  const [S_Cam, setS_Cam] = useState('');
  const [P_Cam, setP_Cam] = useState('');


  const handleSubmit = event => {
    event.preventDefault();

    const objToPass = { Rating: Rating, RAM: RAM, ROM: ROM, Display: Display, S_Cam: S_Cam, P_Cam: P_Cam, Battery: Battery }

    axios.post(url, JSON.stringify(objToPass))
      .then((response) => {
        setPrice(Math.round(response.data))
        console.log("Response", response.data)
      })

      .catch((e) => {
        console.log(e)
      })

    setRAM('');
    setROM('');
    setBattery('');
    setDisplay('');
    setS_Cam('');
    setP_Cam('');
    setRating('');

  };

  return (
    <div className="App">

      <h1 style={{ fontFamily: "monospace", fontSize: "35px" , color:"white"}}>Predict Mobile Price</h1>

      <div style={{ backgroundColor: "#303030", marginLeft: "20%", marginRight: "20%", marginTop: "5px", boxShadow: " 0 4px 8px 0 #585858, 0 6px 15px 5px #585858"}}>


        <div style={{ position: "relative", margin: "0 auto", height: "auto" }}>
          <form onSubmit={handleSubmit}>
            <br></br>

            <div style={{ justifyContent: "center" }} >
              <label style={{ fontSize: "15px", fontFamily: "initial", justifyContent: "left", color:"white" }}>Enter RAM (GB):</label>
              <br></br>
              <input type="text" onChange={event => setRAM(event.target.value)} value={RAM} />
            </div>

            <br></br>

            <p>
              <label style={{ fontSize: "15px", fontFamily: "initial", marginLeft: "0px", color:"white" }}>Enter ROM (GB):</label>
              <br></br>
              <input type="text" value={ROM} onChange={event => setROM(event.target.value)} />
            </p>

            <br></br>

            <p>
              <label style={{ fontSize: "15px", fontFamily: "initial", marginLeft: "0px" , color:"white"}}>Enter Display Size (inches):</label>
              <br></br>
              <input type="text" value={Display} onChange={event => setDisplay(event.target.value)} />
            </p>

            <br></br>

            <p>
              <label style={{ fontSize: "15px", fontFamily: "initial", marginLeft: "0px" , color:"white"}}>Enter Battery (MaH):</label>
              <br></br>
              <input type="text" value={Battery} onChange={event => setBattery(event.target.value)} />
            </p>

            <br></br>

            <p>
              <label style={{ fontSize: "15px", fontFamily: "initial", marginLeft: "0px", color:"white" }}>Enter Selfi Cam Resolution(MP):</label>
              <br></br>
              <input type="text" value={S_Cam} onChange={event => setS_Cam(event.target.value)} />
            </p>

            <br></br>

            <p>
              <label style={{ fontSize: "15px", fontFamily: "initial", marginLeft: "0px" , color:"white"}}>Enter Primary Cam Resolution(MP) :</label>
              <br></br>
              <input type="text" value={P_Cam} onChange={event => setP_Cam(event.target.value)} />
            </p>

            <br></br>

            <p>
              <label style={{ fontSize: "15px", fontFamily: "initial", marginLeft: "0px" , color:"white"}}>Enter Rating (0-5):</label>
              <br></br>
              <input type="text" value={Rating} onChange={event => setRating(event.target.value)} />
            </p>

            <br></br>


            <p>
              <button type="submit" style={{ fontSize: "25px", fontFamily: "initial", marginLeft: "0px" }}>Submit</button>
            </p>

          </form>
        </div>

        <br></br>
        
        <br></br>
        <br></br>


      </div>

      <div style={{ fontSize: "30px", fontWeight: "bolder", fontFamily: "initial", marginLeft: "0px" ,color:"white", marginTop:"40px" , marginBottom:"10px"}}>
           Predicted Price : {Price}
        </div>

      <br></br>
    </div>
  );
}

export default App;
