import React from 'react';
import './activitiesCard.css'

export const ActivitiesCard = (props) => {
 
  return (
      <div className='cardAct'>
      <h2>{props.name.toUpperCase()}</h2>  
      <h4>Id: {props.ID}</h4>
      <h4>Difficulty: {props.difficulty}</h4>
      <h4>Duration: {props.duration}</h4>
      <h4>Season: {props.season}</h4>
      <h4>Countries: {props.countries.map(e=>e.name+', ')}</h4>
      </div>
  );
};