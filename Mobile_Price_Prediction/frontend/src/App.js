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

      <div className='heading'>
        <h1 >Predict Mobile Price</h1>
      </div>

      <div className="box">

        <form className="form" onSubmit={handleSubmit} >
          <br></br>
          <p>
            <label  >Enter RAM (GB):</label>
            <br></br>
            <input type="text" onChange={event => setRAM(event.target.value)} value={RAM} />
          </p>
          <br></br>

          <p>
            <label >Enter ROM (GB):</label>
            <br></br>
            <input type="text" value={ROM} onChange={event => setROM(event.target.value)} />
          </p>

          <br></br>

          <p>
            <label >Enter Display Size (inch):</label>
            <br></br>
            <input type="text" value={Display} onChange={event => setDisplay(event.target.value)} />
          </p>

          <br></br>

          <p>
            <label >Enter Battery (MaH):</label>
            <br></br>
            <input type="text" value={Battery} onChange={event => setBattery(event.target.value)} />
          </p>

          <br></br>

          <p>
            <label >Enter Selfi Cam Resolution(MP):</label>
            <br></br>
            <input type="text" value={S_Cam} onChange={event => setS_Cam(event.target.value)} />
          </p>

          <br></br>

          <p>
            <label >Enter Primary Cam Resolution(MP) :</label>
            <br></br>
            <input type="text" value={P_Cam} onChange={event => setP_Cam(event.target.value)} />
          </p>

          <br></br>

          <p>
            <label >Enter Rating (0-5):</label>
            <br></br>
            <input type="text" value={Rating} onChange={event => setRating(event.target.value)} />
          </p>

          <br></br>


          <p>
            <button type="submit" style={{ fontSize: "25px", fontFamily: "initial", marginBottom: "20px" }}>Submit</button>
          </p>

        </form>

      </div>

      <div className='result'>
        Predicted Price : {Price}
      </div>

      <br></br>

    </div>

  );
}

export default App;
