import React from 'react';
import './countriesCard.css'

export const CountriesCard = (props) => {

  return (
    <div>
      <div className='card'>
      <h4 className='textTransfor'>{props.name}</h4> 
      <img src={props.flag} alt={props.name} />
      <h4>{props.continents}</h4>
      </div>
    </div>
  );
};