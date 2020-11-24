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
        <img src={flag} alt={`${name} flag`} />
      </div>
      <div>
        <h1 className='text-4xl font-bold pb-4'>{name}</h1>
        <p>
          <strong>Capital:</strong> {capital}
        </p>
        <p>
          <strong>Subregion:</strong> {subregion}
        </p>
        <p>
          <strong>Top Level Domain:</strong> {topLevelDomain}
        </p>
        <ul className='flex flex-wrap'>
          <h4 className='font-bold'>
            {languages.length > 1 ? 'Languages:' : 'Language:'}
          </h4>
          {languages.map(l => (
            <li
              className='mx-1 mb-1 px-1 rounded shadow bg-green-400 text-white'
              key={l.name}>
              {l.name}
            </li>
          ))}
        </ul>
        <ul>
          <h4 className='font-bold'>
            {currencies.length > 1 ? 'Currencies:' : 'Currency:'}
          </h4>
          {currencies.map(cur => (
            <li key={cur.name}>
              {cur.name}{' '}
              <span className='bg-green-400 text-white px-2 rounded shadow'>
                {cur.symbol}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default CountryInfo;
