import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';

export const Country = () => {
  return <div></div>;
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
    const countryData = await res.json();

    return {
      props: {
        countryData,
      },
    };
  } catch (err) {
    console.error(err);
  }
};

export default Country;
