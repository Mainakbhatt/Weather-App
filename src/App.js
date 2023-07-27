import { useState } from "react";
import './App.css';
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {

  const apikey = "7c0aeb520c7cd8bf5b0ddae3f09422fa"
  const [inputCity, setInputCity] = useState("")
  const [data, setData] = useState({})

  const getWeatherDetails = (cityName) => {
    if (!cityName) return
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + " &appid=" + apikey
    axios.get(apiUrl).then((res) => {
      console.log("response", res.data)
      setData(res.data)
    }).catch((err) => {
      console.log("err", err)
    })
  } 
  const handleChangeInput = (e) => {
    console.log("value",e.target.value)
    setInputCity(e.target.value)
  }
  const handleSeacrh = () => {
    getWeatherDetails(inputCity)
  }
  return (
    <div className="col-md-12">
      <div className="weatherBg">
        <h1 className="heading">Weather App</h1>
        <div className="d-grid gap-3 col-4 mt-4">
          <input type="text" className="form-control" value={inputCity} onChange={handleChangeInput}></input>
          <button className="btn btn-primary" type="button" onClick={handleSeacrh}>Search</button>
        </div>
      </div>
      {Object.keys(data).length>0 &&
      <div className="col-md-12 text-center mt-5">

        <div className="shadow rounded weatherResultBox">
          <img className="weatherIcon"
            src="https://icon-library.com/images/weather-icon/weather-icon-14.jpg" />
          <h5 className="weatherCity">{data?.name}</h5>
          <h6 className="weatherTemp">{((data?.main?.temp) - 273.15).toFixed(2)}°C</h6>
        </div>

      </div>
}

    </div>
  );
}

export default App;
