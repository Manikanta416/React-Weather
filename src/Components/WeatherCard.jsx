
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useDate } from '../Utils/useDate'
import sun from '../assets/icons/sun.png'
import cloud from '../assets/icons/Cloud.png'
import fog from '../assets/icons/fog.png'
import rain from '../assets/icons/rain.png'
import snow from '../assets/icons/snow.png'
import storm from '../assets/icons/storm.png'
import wind from '../assets/icons/windy.png'
import '../index.css'const WeatherCard = ({
  temperature,
  windspeed,
  humidity,
  place,
  heatIndex,
  iconString,
  conditions,
}) => {

  const [icon, setIcon] = useState(sun)
  const { time } = useDate()

  useEffect(() => {
    if (iconString) {
      if (iconString.toLowerCase().includes('cloud')) {
        setIcon(cloud)
      } else if (iconString.toLowerCase().includes('rain')) {
        setIcon(rain)
      } else if (iconString.toLowerCase().includes('Clear')) {
        setIcon(sun)
      } else if (iconString.toLowerCase().includes('thunder')) {
        setIcon(storm)
      } else if (iconString.toLowerCase().includes('fog')) {
        setIcon(fog)
      } else if (iconString.toLowerCase().includes('snow')) {
        setIcon(snow)
      } else if (iconString.toLowerCase().includes('wind')) {
        setIcon(wind)
      }
    }
  }, [iconString])

  return (
    <div className='w-[22rem] min-w-[22rem] h-[30rem] glassCard p-4'>
      <div className='flex w-full just-center, items-center gap-4 mt-12 mb-4'>
        <img src={icon} alt="weather_icon" />
        <p className='flex items-center justify-center text-5xl font-bold' >{temperature} &deg;C</p>
      </div>
      <div className='text-xl font-bold text-center'>
        {place}
      </div>
      <div className='flex items-center justify-between w-full mt-4'>
        <p className='flex-1 p-2 text-center'>{new Date().toDateString()}</p>
        <p className='flex-1 p-2 text-center'>{time}</p>
      </div>
      <div className='flex items-center justify-between w-full gap-4 mt-4'>
        <p className='flex-1 p-2 font-bold text-center bg-blue-600 rounded-lg shadow'>Wind Speed <p className='font-normal'>{windspeed} km/h</p></p>
        <p className='flex-1 p-2 font-bold text-center bg-green-600 rounded-lg'>Humidity <p className='font-normal'>{humidity} gm/m&#179;</p></p>
      </div>
      <div className='flex items-center justify-between w-full p-3 mt-4'>
        <p className='text-lg font-semibold'>Heat Index</p>
        <p className='text-lg'>{heatIndex ? heatIndex : 'N/A'}</p>
      </div>
      <hr className='bg-slate-600' />
      <div className='flex items-center justify-center w-full p-4 text-3xl font-semibold'>
        {conditions}
      </div>
    </div>
  )
}

export default WeatherCard