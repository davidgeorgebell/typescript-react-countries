import { GetStaticProps } from 'next';
import { useState } from 'react';

import CountryCard from './components/CountryCard';
import Header from './components/Header';
import Layout from './components/Layout';
import RegionList from './components/RegionList';

export default function Home({ allCountries }) {
  const [searchFilter, setSearchFilter] = useState('');

  const handleSearchFilter = e => setSearchFilter(e.target.value);

  const handleRegionFilter = region => setSearchFilter(region);

  const searchedCountries = allCountries.filter(
    country =>
      country.name.toLowerCase().includes(searchFilter) ||
      country.region.toLowerCase().includes(searchFilter)
  );
  return (
    <>
      <Header handleSearchFilter={handleSearchFilter} />
      <Layout title='Home'>
        <RegionList handleRegionFilter={handleRegionFilter} />
        <h3 className='font-mono text-xl pr-10 capitalize'>
          Displaying: {searchFilter.length ? searchFilter : 'All'}
        </h3>
        <ul className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {searchedCountries.map(c => (
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
      </Layout>
    </>
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
