import { GetStaticProps } from 'next';
import Head from 'next/head';
import CountryCard from './components/CountryCard';

export default function Home({ allCountries }) {
  return (
    <div>
      <Head>
        <title>Countries</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <ul className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
          {allCountries.map(c => (
            <CountryCard
              key={c.name}
              flag={c.flag}
              name={c.name}
              region={c.region}
              capital={c.capital}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const allCountries = await res.json();
    console.log(allCountries);
    return {
      props: {
        allCountries,
      },
    };
  } catch (err) {
    console.error(err);
  }
};
