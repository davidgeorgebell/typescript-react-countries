import { GetStaticProps } from 'next';
import Head from 'next/head';
import CountryCard from './components/CountryCard';
import Layout from './components/Layout';

export default function Home({ allCountries }) {
  return (
    <Layout title='Home'>
      <main>
        <ul className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
          {allCountries.map(c => (
            <CountryCard
              key={c.name}
              flag={c.flag}
              name={c.name}
              region={c.region}
              capital={c.capital}
              alpha3Code={c.alpha3Code}
            />
          ))}
        </ul>
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const allCountries = await res.json();
    return {
      props: {
        allCountries,
      },
    };
  } catch (err) {
    console.error(err);
  }
};
