import React, { useEffect, useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { motion } from 'framer-motion';

import Layout from '../../components/Layout';
import Link from 'next/link';
import Weather from '../../components/Weather';

const transition = { duration: 1, ease: [0.6, 0.01, -0.05, 0.9] };

const Country = ({
  country,
}: {
  country: {
    flag: string;
    name: string;
    capital: string;
    subregion: string;
    topLevelDomain: string;
    currencies: [
      {
        name: string;
        symbol: string;
      }
    ];
    languages: [
      {
        name: string;
      }
    ];
  };
}) => {
  const [capitalCityWeather, setCapitalCityWeather] = useState<any>(null);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`
        );
        const weather = await res.json();
        setCapitalCityWeather(weather);
      } catch (err) {
        console.error(err);
      }
    };
    getWeather();
  }, []);

  return (
    <Layout title={country.name}>
      <div className='pb-10'>
        <Link href='/'>
          <a>
            <button className='my-2 mx-1 text-white font-bold py-2 px-4 rounded shadow bg-green-400 hover:bg-green-500'>
              Back
            </button>
          </a>
        </Link>
      </div>
      <div className='grid gap-16 grid-cols-1 md:grid-cols-2 py-10'>
        <div>
          <motion.img
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={transition}
            className='rounded shadow'
            src={country.flag}
            alt={`${country.name} flag`}
          />
        </div>
        <div>
          <motion.h1
            className='text-4xl font-bold pb-4'
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={transition}>
            {country.name}
          </motion.h1>
          {country.capital && (
            <motion.p
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={transition}>
              <strong>Capital:</strong> {country.capital}
            </motion.p>
          )}
          {country.subregion && (
            <motion.p
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={transition}>
              <strong>Subregion:</strong> {country.subregion}
            </motion.p>
          )}
          <motion.p
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={transition}>
            <strong>Top Level Domain:</strong> {country.topLevelDomain}
          </motion.p>
          <ul className='flex flex-wrap'>
            <motion.h4
              className='font-bold'
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={transition}>
              Languages
            </motion.h4>
            {country.languages.map(l => (
              <motion.li
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={transition}
                className='mx-1 mb-1 px-1 rounded shadow bg-green-400 text-white'
                key={l.name}>
                {l.name}
              </motion.li>
            ))}
          </ul>
          <ul>
            <motion.h4
              className='font-bold'
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={transition}>
              Currencies
            </motion.h4>
            {country.currencies.map(cur => (
              <motion.li
                key={cur.name}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={transition}>
                {cur.name}{' '}
                <span className='bg-green-400 text-white px-2 rounded shadow'>
                  {cur.symbol}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
      {capitalCityWeather &&
      capitalCityWeather.weather &&
      capitalCityWeather.main ? (
        <Weather
          capitalCityWeather={{
            feels_like: capitalCityWeather.main.feels_like,
            main: capitalCityWeather.weather[0].main,
            temp: capitalCityWeather.main.temp,
            temp_max: capitalCityWeather.main.temp_max,
            temp_min: capitalCityWeather.main.temp_min,
          }}
          capitalCity={country.capital}
        />
      ) : null}
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await res.json();
    const paths = await json.map(c => {
      return {
        params: {
          slug: c.alpha3Code,
        },
      };
    });
    return {
      paths,
      fallback: false,
    };
  } catch (err) {
    console.error(err);
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const res = await fetch(
      `https://restcountries.eu/rest/v2/alpha/${params.slug}`
    );
    const country = await res.json();

    return {
      props: {
        country,
      },
    };
  } catch (err) {
    console.error(err);
  }
};

export default Country;
