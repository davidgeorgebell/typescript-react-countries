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
    <li className='border'>
      <Link href={`/country/[slug]`} as={`country/${alpha3Code}`}>
        <a>
          <img src={flag} alt={`${name} flag`} />
          <h3>{name}</h3>
          <p>{region}</p>
          <p>{capital}</p>
        </a>
      </Link>
    </li>
  );
};
export default CountryCard;
