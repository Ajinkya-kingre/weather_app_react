import { useEffect, useState } from "react";
import Search from "../search";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  async function fetchWeatherData(params) {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${params}&appid=85bb0c5876290acccea19bc652eb09b9`
      );
      const data = await res.json();
      console.log(data, "data");
      if (data) {
        setLoading(false);
        setWeatherData(data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWeatherData("kyoto");
  }, []);

  function handleSearch() {
    fetchWeatherData(search);
  }
  function getCurrData() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div>
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {loading ? (
        <div>Loading Data!!! Please Wait!</div>
      ) : (
        <div>
          <div className="city-name">
            <h2>
              {weatherData?.name}, <span>{weatherData?.sys?.country}</span>
            </h2>
          </div>
          <div className="date">{getCurrData()}</div>
          <div>{weatherData?.main?.temp}</div>
          <div className="description">
            {weatherData && weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].description : ""}
          </div>
        </div>
      )}
    </div>
  );
}
