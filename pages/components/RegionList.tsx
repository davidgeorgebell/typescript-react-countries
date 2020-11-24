import React from 'react';

const regions = [
  { region: 'africa' },
  { region: 'asia' },
  { region: 'america' },
  { region: 'europe' },
  { region: 'oceania' },
  { region: 'polar' },
];

const RegionList = ({ handleRegionFilter }) => {
  return (
    <ul className='flex flex-wrap justify-center py-10'>
      <li>
        <button
          className='my-2 mx-1 text-white font-bold py-2 px-4 rounded bg-green-400 hover:bg-green-500'
          onClick={() => handleRegionFilter('')}>
          #all
        </button>
      </li>
      {regions.map(r => (
        <li key={r.region}>
          <button
            className='my-2 mx-1 text-white font-bold py-2 px-4 rounded bg-green-400 hover:bg-green-500'
            onClick={() => handleRegionFilter(r.region)}>
            #{r.region}
          </button>
        </li>
      ))}
    </ul>
  );
};
export default RegionList;
