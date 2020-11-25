import { motion } from 'framer-motion';
import React from 'react';

type CountryInfoProps = {
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

const transition = { duration: 0.6, ease: [0.6, 0.01, -0.05, 0.9] };

const CountryInfo = ({
  flag,
  name,
  capital,
  subregion,
  topLevelDomain,
  currencies,
  languages,
}: CountryInfoProps) => {
  return (
    <div className='grid gap-16 grid-cols-1 md:grid-cols-2 py-10'>
      <div>
        <motion.img
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ transition }}
          className='rounded shadow'
          src={flag}
          alt={`${name} flag`}
        />
      </div>
      <div>
        <motion.h1
          className='text-4xl font-bold pb-4'
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={transition}>
          {name}
        </motion.h1>
        {capital && (
          <motion.p
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={transition}>
            <strong>Capital:</strong> {capital}
          </motion.p>
        )}
        {subregion && (
          <motion.p
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={transition}>
            <strong>Subregion:</strong> {subregion}
          </motion.p>
        )}
        <motion.p
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={transition}>
          <strong>Top Level Domain:</strong> {topLevelDomain}
        </motion.p>
        <ul className='flex flex-wrap'>
          <motion.h4
            className='font-bold'
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={transition}>
            {languages && languages.length > 1 ? 'Languages:' : 'Language:'}
          </motion.h4>
          {languages.map(l => (
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
            {currencies.length > 1 ? 'Currencies:' : 'Currency:'}
          </motion.h4>
          {currencies &&
            currencies.map(cur => (
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
  );
};
export default CountryInfo;
