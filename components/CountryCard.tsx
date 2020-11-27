import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

type CountryCardProps = {
  name: string;
  region: string;
  capital: string;
  flag: string;
  alpha3Code: string;
};

const CountryCard = ({
  name,
  region,
  capital,
  flag,
  alpha3Code,
}: CountryCardProps) => {
  return (
    <motion.li
      className='bg-white py-4 rounded'
      layout
      transition={{ duration: 0.4 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}>
      <Link href={`/country/[slug]`} as={`country/${alpha3Code}`}>
        <a>
          <div>
            <motion.img
              className='object-cover h-48 w-full rounded shadow-2xl'
              src={flag}
              alt={`${name} flag`}
              whileHover={{ opacity: 0.8 }}
            />
          </div>
          <div className='mx-auto container px-4 py-5'>
            <h3 className='text-2xl py-4 font-bold'>{name}</h3>
            <p>
              <strong>Region:</strong> {region}
            </p>
            {capital && (
              <p>
                <strong>Capital:</strong> {capital}
              </p>
            )}
          </div>
        </a>
      </Link>
    </motion.li>
  );
};
export default CountryCard;
