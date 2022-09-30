import './App.css';
import axios from 'axios'
import { useState } from 'react'


const url = 'http://127.0.0.1:5000/api'

function App() {

  const [result, setResult] = useState("NULL")
  const [age, setAge] = useState('');
  const [affordablity, setAffordablity] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    const objToPass = { age: age, affordablity: affordablity }

    axios.post(url, JSON.stringify(objToPass))
      .then((response) => {
        if (response.data == 1)
          setResult("Will Buy Insurance..!")
        else
          setResult("Will Not Buy Insurance..!")

        console.log("Response", response.data)
      })

      .catch((e) => {
        console.log(e)
      })

    setAge('');
    setAffordablity('');
  };

  return (
    <div className="App">

      <h1>Predict if a person can buy insurance or not?</h1>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <form onSubmit={handleSubmit}>

          <p>
            <label>Enter Age :</label>
            <br></br>
            <input type="text" onChange={event => setAge(event.target.value)} value={age} />
          </p>

          <br></br>

          <p>
            <label>Enter Affordablity :</label>
            <br></br>
            <input type="text" value={affordablity} onChange={event => setAffordablity(event.target.value)} />
          </p>

          <p>
            <button type="submit" >Submit</button>
          </p>

        </form>
      </div>

      <div style={{ fontWeight: 'bolder' }}>
        Result : {result}
      </div>

    </div>
  );
}

export default App;
