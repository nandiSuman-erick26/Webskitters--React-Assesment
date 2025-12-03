// import React from 'react'

import axios from "axios";
import { useState } from "react";
// import { WeatherAPI } from "../api/endpoint"
import { Box, Button, TextField, Typography } from "@mui/material";
import { toast } from "sonner";
import {
  Droplet,
  Locate,
  Map,
  MapPin,
  SunSnow,
  Thermometer,
  Wind,
} from "lucide-react";

const weatherAPIkey = import.meta.env.VITE_WEATHER_API_KEY;
const GetWeather = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [query, setQuery] = useState("");
  const [celsiusToggle, setCelsiusToggle] = useState(false);

  const fetchWeather = async () => {
    if (!query) return;
    try {
      const city = encodeURIComponent(query.trim());
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIkey}&units=imperial`;
      const response = await axios.get(url);
      console.log("weather response:", response?.data);
      setWeatherData(response.data);
    } catch (err: any) {
      console.error("fetchWeather error:", err?.response);
      toast.error(err?.statusText || "not found");
      // optionally surface an error to the user
    }
  };

  const handleChange = (e: any) => {
    setQuery(e.target.value);
  };

  const handleClick = () => {
    if (!query) {
      toast.error("Please enter a city name");
    }

    fetchWeather();
    setQuery("");
  };

  const fahrenheitToCelsius = (f?: number | null) => {
    if (f === undefined || f === null) return null;
    return (f - 32) * (5 / 9);
  };

  // useEffect(()=>{
  //   if(quary){
  //     fetchWeather()
  //   }
  // }, [quary])

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 10,
        bgcolor: "#b4ffd9ff",
      }}
    >
      <Typography
        variant="h2"
        textTransform={"capitalize"}
        sx={{ color: "#024221ff", fontWeight: 600 }}
      >
        <Map size={48} /> Weather App
      </Typography>
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="h5" textTransform={"capitalize"}>
          <MapPin size={18} /> search for your city's weather.
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Enter your city name....."
          value={query}
          onChange={handleChange}
          fullWidth
        />
        <Button
          variant="contained"
          sx={{ textTransform: "uppercase", bgcolor: "#1a633dff" }}
          onClick={handleClick}
        >
          <Locate color="#fff" />
          <span style={{ padding: 2 }}>Get Weather</span>
        </Button>
      </Box>
      {weatherData && (
        <Box
          sx={{
            // border: "2px solid #8181817c",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "left",
            gap: 2,
            padding: "10px",
            width: "60%",
            bgcolor: "#427159ff",
            boxShadow: "0 2px 14px #0f3421b3",
          }}
        >
          <Typography
            variant="h4"
            textTransform={"capitalize"}
            color="#27ffedff"
            sx={{ fontWeight: 800, fontSize: 22, textAlign: "center" }}
          >
            {weatherData?.name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: 500, fontSize: 19, alignContent: "center" }}
              textTransform={"capitalize"}
            >
              <Thermometer />
              Temp:
              <span style={{ color: "#fff" }}>
                {(() => {
                  const tempF = weatherData?.main?.temp;
                  if (tempF == null) return;
                  if (celsiusToggle) {
                    const c = fahrenheitToCelsius(tempF)!;
                    return `${c.toFixed(1)}℃`;
                  }
                  return `${Number(tempF).toFixed(1)}℉`;
                })()}
              </span>
            </Typography>
            <Button
              size="small"
              variant="contained"
              onClick={() => setCelsiusToggle((s) => !s)}
              sx={{ bgcolor: "#ffbc2cff", color: "#427159", fontWeight: 600 }}
            >
              {celsiusToggle ? "Show °F" : "Show °C"}
            </Button>
          </Box>
          <Typography
            variant="body1"
            sx={{ fontWeight: 500, fontSize: 19 }}
            textTransform={"capitalize"}
          >
            <Droplet />
            Humidity:
            <span style={{ color: "#fff" }}>
              {weatherData?.main?.humidity}{" "}
            </span>
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: 500, fontSize: 19 }}
            textTransform={"capitalize"}
          >
            <SunSnow /> Condition:
            <span style={{ color: "#fff" }}>
              {weatherData?.weather[0]?.main}
            </span>
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: 500, fontSize: 19 }}
            textTransform={"capitalize"}
          >
            <Wind /> Windspeed:
            <span style={{ color: "#fff" }}>
              {weatherData?.wind?.speed} kmph
            </span>
          </Typography>
        </Box>
      )}
      <Typography
        variant="body1"
        sx={{
          position: "absolute",
          bottom: 20,
          color: "#8a8a8aff",
          fontSize: 12,
          ":hover": {
            cursor: "pointer",
            color: "#000",
            textDecoration: "underline",
          },
        }}
      >
        Devoloped by ©{" "}
        <a
          href="https://github.com/nandiSuman-erick26"
          style={{ textDecoration: "none", color: "#000" }}
        >
          Suman_Nandi
        </a>
      </Typography>
    </Box>
  );
};

export default GetWeather;
