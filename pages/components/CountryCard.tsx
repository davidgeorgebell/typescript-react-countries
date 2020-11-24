import React from 'react';
import Link from 'next/link';

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
    <li className='bg-white py-4 rounded'>
      <Link href={`/country/[slug]`} as={`country/${alpha3Code}`}>
        <a>
          <div>
            <img
              className='object-cover h-48 w-full rounded shadow-2xl'
              src={flag}
              alt={`${name} flag`}
            />
          </div>
          <div className='mx-auto container px-4 py-5'>
            <h3 className='text-2xl py-4 font-bold'>{name}</h3>
            <p>
              <strong>Region:</strong> {region}
            </p>
            <p>
              <strong>Capital:</strong> {capital}
            </p>
          </div>
        </a>
      </Link>
    </li>
  );
};
export default CountryCard;
