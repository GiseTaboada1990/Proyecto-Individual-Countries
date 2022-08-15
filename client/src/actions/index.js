import axios from 'axios';

export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_DETAILS = 'GET_DETAILS';
export const CLEAN_DETAILS = 'CLEAN_DETAILS';
export const CLEAN_NAMES = 'CLEAN_DETAILS';
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY';
export const GET_NAME = 'GET_NAME';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const FILTER_BY_ACTIVITIES = 'FILTER_BY_ACTIVITIES'
export const ORDER_BY_ALFA = 'ORDER_BY_ALFA';
export const ORDER_BY_POPULATION = 'ORDER_BY_POPULATION'
export const FILTER_BY_CONTINENTS = 'FILTER_BY_CONTINENTS';
export const DELETE_ACTIVITIES = 'DELETE_COUNTRY';
export const GET_ACTIVITY_NAME = 'GET_ACTIVITY_NAME';
export const GET_COUNTRY_ACTIVITIES= 'GET_COUNTRY_ACTIVITIES';
export const GET_ACTIVITIES_DETAILS='GET_ACTIVITIES_DETAILS';
export const  UPDATE_ACTIVITY=' UPDATE_ACTIVITY';

export const getCountries = () => {
    return async (dispatch)=> {
        try {
            const json = await axios.get(`http://localhost:3001/countries`)
            const data = json.data
            return dispatch({
                type: GET_COUNTRIES,
                payload: data
            })
        } catch (error) {
            return (error)
        }
    }
}
export const getDetails = (id) => {
    return async (dispatch) => {
        try {
            const json = await axios(`http://localhost:3001/countries/${id}`)
            return dispatch({
                type: GET_DETAILS,
                payload: json.data
            })
        } catch (error) {
            return error
        }
    }
}
export const cleanDetails = () => {
    return ({
        type: CLEAN_DETAILS,
        payload: []
    })
}

export const searchName = (name) => {
    return async (dispatch) => {
        try {
            const json = await axios(`http://localhost:3001/countries?name=${name}`)
            return dispatch({
                type: GET_NAME,
                payload: json.data
            })
        } catch (error) {
            return error
        }
    }
}
export const getActivities = () => {
    return async (dispatch) => {
        try {
            const json = await axios('http://localhost:3001/activities')
            return dispatch({
                type: GET_ACTIVITIES,
                payload: json.data
            })
        } catch (error) {
            return error
        }
    }
}
export const searchNameActivity = (name) => {
    return async (dispatch) => {
        try {
            const json = await axios(`http://localhost:3001/activities?name=${name}`)
            return dispatch({
                type: GET_ACTIVITY_NAME,
                payload: json.data
            })
        } catch (error) {
            return error
        }
    }
}
export const filterByActivities = (payload) => {
    return {
        type: FILTER_BY_ACTIVITIES,
        payload
    }
}
export const orderByAlfa = (payload) => {
    return {
        type: ORDER_BY_ALFA,
        payload
    }
};
export const orderByPopulation = (payload) => {
    return {
        type: ORDER_BY_POPULATION,
        payload
    }
};
export const filterByContinents = (payload) => {
    return {
        type: FILTER_BY_CONTINENTS,
        payload
    }
}
export const getActivitiesDetails = (id) => {
    return async (dispatch) => {
        try {
            const json = await axios(`http://localhost:3001/activities/${id}`)
            return dispatch({
                type: GET_ACTIVITIES_DETAILS,
                payload: json.data
            })
        } catch (error) {
            return error
        }
    }
}

export const deleteActivities =(id) => {
    return async(dispatch)=>{
        try{
            const json= await axios.delete(`http://localhost:3001/activities/${id}`)
            return dispatch({
                type: DELETE_ACTIVITIES,
                payload:json.data
            })
        }catch(error){
            return error
        }
    }
   
}
export const updateActivity=(id, form)=>{
    return async (dispatch)=>{
        try{
            const json = await axios.put(`http://localhost:3001/activities/${id}`, form)
            const data = json.data;
            if(data.status === 200) dispatch({
                type: UPDATE_ACTIVITY,
                payload: id
            })
            return data;
        }catch(error){
            return(error)
        }
    }
}