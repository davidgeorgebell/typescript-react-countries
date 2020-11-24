import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Layout from '../components/Layout';
import { count } from 'console';
import Link from 'next/link';

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
      <div className='grid gap-16 grid-cols-1 md:grid-cols-2'>
        <div>
          <img src={country.flag} alt={`${country.name} flag`} />
        </div>
        <div>
          <h1 className='text-4xl font-bold pb-4'>{country.name}</h1>
          <p>
            <strong>Capital:</strong> {country.capital}
          </p>
          <p>
            <strong>Subregion:</strong> {country.subregion}
          </p>
          <p>
            <strong>Top Level Domain:</strong> {country.topLevelDomain}
          </p>
          <ul>
            <h4 className=' font-bold'>
              {country.languages.length > 1 ? 'Languages:' : 'Language:'}
            </h4>
            {country.languages.map(l => (
              <li key={l.name}>{l.name}</li>
            ))}
          </ul>
          <ul>
            <h4 className='font-bold'>
              {country.currencies.length > 1 ? 'Currencies:' : 'Currency:'}
            </h4>
            {country.currencies.map(cur => (
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
