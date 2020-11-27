import { motion } from 'framer-motion';
import React from 'react';

type WeatherProps = {
  capitalCity: string;
  capitalCityWeather: {
    main: string;
    feels_like: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
};

const Weather = ({ capitalCityWeather, capitalCity }: WeatherProps) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={`${
          capitalCityWeather.temp >= 30
            ? 'bg-red-700'
            : capitalCityWeather.temp >= 20
            ? 'bg-red-600'
            : capitalCityWeather.temp >= 15
            ? 'bg-yellow-500'
            : capitalCityWeather.temp >= 10
            ? 'bg-blue-300'
            : 'bg-blue-100'
        } rounded shadow-2xl my-10 py-10`}>
        {capitalCity && (
          <h3 className='text-3xl text-center leading-snug'>
            Weather in {capitalCity}
          </h3>
        )}
        <ul className='flex flex-wrap justify-center'>
          <li className='bg-white p-4 m-4 rounded shadow text-2xl font-bold flex flex-col justify-center align-center'>
            {capitalCityWeather.main}
          </li>
          <li className='flex flex-col bg-white p-4 m-4 rounded shadow'>
            Main{' '}
            <span className='text-4xl font-bold'>
              {Math.round(capitalCityWeather.temp)}
              <span>ºC</span>
            </span>
          </li>
          <li className='flex flex-col bg-white p-4 m-4 rounded shadow'>
            Feels like{' '}
            <span className='text-4xl font-bold'>
              {Math.round(capitalCityWeather.feels_like)}
              <span>ºC</span>
            </span>
          </li>
          <li className='flex flex-col bg-white p-4 m-4 rounded shadow'>
            Low{' '}
            <span className='text-4xl font-bold'>
              {Math.round(capitalCityWeather.temp_min)}
              <span>ºC</span>
            </span>
          </li>
          <li className='flex flex-col bg-white p-4 m-4 rounded shadow'>
            High{' '}
            <span className='text-4xl font-bold'>
              {Math.round(capitalCityWeather.temp_max)}
              <span>ºC</span>
            </span>
          </li>
        </ul>
      </motion.div>
    </>
  );
};
export default Weather;
