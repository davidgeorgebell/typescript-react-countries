import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Layout from '../components/Layout';
import Link from 'next/link';
import CountryInfo from '../components/CountryInfo';

const Country = ({ country }) => {
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
      <CountryInfo
        name={country.name}
        flag={country.flag}
        currencies={country.currencies}
        capital={country.capital}
        subregion={country.subregion}
        languages={country.languages}
        topLevelDomain={country.topLevelDomain}
      />
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
