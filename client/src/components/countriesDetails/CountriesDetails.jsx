import React from 'react';
import { Link, useHistory} from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import {getDetails,cleanDetails} from '../../actions';
import { useEffect } from 'react';
import './countriesDetails.css'


export const CountriesDetails=(props)=>{
    const dispatch = useDispatch();
    const history = useHistory();
    const cDetails = useSelector((state) => state.details);
  
    useEffect(() => {
        dispatch(getDetails(props.match.params.id))
        return ()=>{
            dispatch(cleanDetails())
        }
    }, [props.match.params.id, dispatch]);


    const cleanSubmit= (e)=> {
        e.preventDefault()
        history.push('/home')
    }
    
    return (
        <div className ='card_details_wrapper'>
            {cDetails.length!==0 && 
            <div className='displayButton'>
            <button
            onClick={(e) => cleanSubmit(e)}>Return to Home</button>
            </div>} 
            {cDetails.length!==0 && 
            <img className='card_details_img'
            src={cDetails.flag}alt={cDetails.name}  width = '300px' height = '200px'/>}
            {cDetails.length!==0?
            <div className='card_details'>
                        <h1>{cDetails.name}</h1>
                        <h4>Capital: {cDetails.capital}</h4>
                        <h4>SuRegion: {cDetails.subregion}</h4>
                        <h4>Area: {cDetails.area} Km²</h4>
                        <h4>Population: {cDetails.population}</h4>
                        <h4>Continents: {cDetails.continents}</h4>
                        <h4>Id: {cDetails.id}</h4>
                        <div className = 'activity_title'> Tourist Activities: </div>
                        <div className='activity_wrapper'>
                        {cDetails.activities.length?
                        cDetails.activities.map(e=>{
                            return(<ul className='activity' key={e.ID}>
                          <li>Id: {e.ID}</li>
                          <li>Name: {e.name}</li>
                          <li>Season: {e.season}</li>
                          <li>Difficulty: {e.difficulty}</li>
                          <li>Duration: {e.duration}</li></ul>)}):
                        <Link to='/home/create'><span style={{color: 'chartreuse'}}>Create Tourist Activity</span></Link>}
                        </div>
                </div>
                :<div className='detailsNotFound'>
                    <p>Country not found</p>
                        <button onClick={(e) => cleanSubmit(e)}>Return to Home</button>  
                    </div>
            }
            
        </div>
    )
}