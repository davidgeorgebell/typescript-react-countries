import React from 'react';

type CountryCardProps = {
  name: string;
  region: string;
  capital: string;
  flag: string;
};

const CountryCard = ({ name, region, capital, flag }: CountryCardProps) => {
  return (
    <li className='border'>
      <img src={flag} alt={`${name} flag`} />
      <h3>{name}</h3>
      <p>{region}</p>
      <p>{capital}</p>
    </li>
  );
};
export default CountryCard;
