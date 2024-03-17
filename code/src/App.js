import './App.css';
import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const[latitude, setLatitude]= useState("41.04486");
  const[longitude, setLongitude]= useState("28.99934");


  useEffect(() => {
    
    fetchData();
  }, []);


 const fetchData = async () => {
      try {
        const response = await axios.get("https://api.open-meteo.com/v1/forecast?latitude="+latitude+"&longitude="+longitude+"&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m");
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }};

  return (

    
    <div>
    <div className='main-area'>

      <div className='"navbar'>
        <h3>Anlık Hava Durumu</h3>
        </div>


         
      <div className='main-box'> 
         <p> koordinatları giriniz: </p>
         <input className='box1' placeholder= "latitude" type="text" onChange={(e) => { setLatitude(e.target.value) }} value={latitude} />
         <input className= "box2" placeholder="longitude" type="text" onChange={(e) => { setLongitude(e.target.value) }} value={longitude} />
         <button className ="button" onClick={() => { fetchData()}}>Getir</button>
      </div>
         
         {weatherData && (
        <div className='bolum'>
          
          

          <ul>
            {weatherData.hourly.time.map((time, index) => (
              <li key={index}>
                <div className='time'><strong>Time:</strong> {time}, </div>
                <div className='windSpeed'> <strong> Wind Speed:</strong> {weatherData.hourly.wind_speed_10m[index]} km/h,</div>
                <div className='temperature'> <strong> Temperature:</strong> {weatherData.hourly.temperature_2m[index]} °C</div>
              </li>
            ))}
          </ul>

        </div>
      )}
    </div>  </div>
  );
};

export default Weather;
