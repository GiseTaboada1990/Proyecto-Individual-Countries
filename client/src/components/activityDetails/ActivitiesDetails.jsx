import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cleanDetails, deleteActivities, getActivitiesDetails } from '../../actions';
import { useEffect } from 'react';
import './activityDetails.css'


export const ActivitiesDetails = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const details = useSelector((state) => state.actDetails);

    useEffect(() => {
        dispatch(getActivitiesDetails(props.match.params.id))
        return () => {
            dispatch(cleanDetails())
        }
    }, [props.match.params.id, dispatch]);

    const handleOnDelete = (id) => {
        const confirmacion = () => {
            const res = window.confirm("do you really want to delete this activity?")
            if (res === true) {
                dispatch(deleteActivities(id))
                history.push('/home/create/activities')
            }
        }
        confirmacion()
    }

    const cleanSubmit = (e) => {
        e.preventDefault()
        history.push('/home/create/activities')
    }
    function handleEdit(){
        history.push('/home/create', details)

    }    
    
    return (
        <div className='cardDetailActivitiesWrapper'>
            {details.length !== 0 &&
                <div className='dispButton'>
                    <button
                        onClick={(e) => cleanSubmit(e)}>Back to activities</button>
                </div>}
            {details.length !== 0 ?
                <div className='cardDetails'>
                    <h1>{details.name}</h1>
                    <h4>Season: {details.season}</h4>
                    <h4>Difficulty: {details.difficulty}</h4>
                    <h4>Duration: {details.duration}</h4>
                    <h4>Id: {details.ID}</h4>
                    <div className='act_title'>Countries:</div>
                    <div className='act_wrapper'>
                    {details.countries.map((e, i) =>{
                        return(<ul className='act'>
                            <Link to={'/home/'+ e.id}><span style={{color: 'chartreuse'}}><li>{e.name + ', '}</li></span></Link>
                        </ul>)
                    })}
                    </div>
                    <div className='btnDetails'>
                    <button onClick={() => { handleOnDelete(details.ID) }}>Delete x</button>
                    <button onClick={() => handleEdit(details.ID)}>Edit Activity</button>
                    </div>
                </div> : <div className='ntFound'>
                    <p>Activity not found</p>
                    <button onClick={(e) => cleanSubmit(e)}>Back to activities</button>
                </div>
            }

        </div>
    )
}