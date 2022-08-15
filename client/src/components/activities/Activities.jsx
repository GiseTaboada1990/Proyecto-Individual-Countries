import  React,{ useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { cleanDetails, getActivities} from "../../actions"
import { ActivitiesCard } from "../activitiesCard/ActivitiesCard"
import { SearchBarActivity } from "../searchBarActivity/SearchBarActivity"
import './activities.css'

export const Activities = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    
    
    useEffect(() => {
        dispatch(getActivities())
        return ()=>{
            dispatch(cleanDetails())
        }
    }, [dispatch])
   
    const handleOnClick=(e)=>{
        e.preventDefault()
        dispatch(getActivities())
        state.error=null
    }

    return (
        <div className="body">
            <div className="menuLinks">
            <Link to='/home'>Home</Link>
            <Link className='link' to='/'>Inicio</Link>
            </div>
            <SearchBarActivity/>
            <br/>
            <button 
                className='button-85'
                onClick={e=>{handleOnClick(e)}}>Recharge countries</button>
            {state.activities.length>0 &&
            <p>If you want to create a tourist activity, click <Link to='/home/create'><span style={{color: 'white'}}> here</span></Link></p>}
            <div className="ordenarActivities">
            {state.activities.length>0? state.activities && state.activities.map((a, i) => {
                return <div key={i}>
                    <Link to={'/home/create/activities/' + a.ID} key={i}>
                    <ActivitiesCard
                        key={i}
                        ID={a.ID}
                        name={a.name}
                        season={a.season}
                        duration={a.duration}
                        difficulty={a.difficulty}
                        countries={a.countries} /></Link>
                </div>
            }):<p>THERE ARE NO TOURIST ACTIVITIES, YOU CAN CREATE THEM BY CLICKING
                 <Link to='/home/create'><span style={{color: 'white'}}> here</span></Link></p>}
            </div>
        </div>
    )
}