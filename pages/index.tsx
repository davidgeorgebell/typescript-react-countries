import { GetStaticProps } from 'next';
import { useState } from 'react';
import CountryCard from '../components/CountryCard';
import Header from '../components/Header';
import Layout from '../components/Layout';
import RegionList from '../components/RegionList';

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
        <h3 className='font-bold text-xl pr-10 py-10'>
          Displaying:{' '}
          <span className='text-green-500'>
            {searchFilter.length ? searchFilter : 'all'}
          </span>
        </h3>
        {searchedCountries.length ? (
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
        ) : (
          <div className='py-10'>
            <h2 className='text-6xl font-bold'>
              No Countries match{' '}
              <span className='text-green-500'>{searchFilter}</span>
            </h2>
          </div>
        )}
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
