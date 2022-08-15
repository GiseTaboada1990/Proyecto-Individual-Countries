import {
    GET_COUNTRIES,
    GET_DETAILS,
    CLEAN_DETAILS,
    CREATE_ACTIVITY,
    GET_NAME,
    GET_ACTIVITIES,
    GET_ACTIVITY_NAME,
    FILTER_BY_ACTIVITIES,
    ORDER_BY_ALFA,
    ORDER_BY_POPULATION,
    FILTER_BY_CONTINENTS,
    GET_ACTIVITIES_DETAILS
} from "../actions";

const initialState = {
    countries: [],
    details: [],
    activities: [],
    allCountries: [],
    error: '',
    error1:'',
    actDetails: [],
}
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload,
            }
        case GET_DETAILS:
            return {
                ...state,
                details: action.payload
            }

        case CLEAN_DETAILS:
            return {
                ...state,
                details: action.payload,
                countries: action.payload,
                activities: action.payload,
                actDetails: action.payload,
            }
        case CREATE_ACTIVITY:
            return {
                ...state
            }
        case GET_NAME:
            let names = action.payload
            if (names.length === 0) {
                return {
                    ...state,
                    error1: 'Country not found'
                }
            } else {
                return {
                    ...state,
                    countries: action.payload,
                    error1: null
                }
            }
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            }
        case GET_ACTIVITIES_DETAILS:
            return {
                ...state,
                actDetails: action.payload,
            }
        case GET_ACTIVITY_NAME:
            let names1 = action.payload
            if (names1.length === 0) {
                return {
                    ...state,
                    error: 'Activity not found'
                }
            } else {
                return {
                    ...state,
                    activities: action.payload,
                    error: null
                }
            }
        case ORDER_BY_ALFA:
            let sortedArray = action.payload === 'asc' ?
                state.countries.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                    if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
                    return 0;
                }) :
                state.countries.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                    if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;
                    return 0;
                });
            return {
                ...state,
                countries: sortedArray
            };
        case ORDER_BY_POPULATION:
            let sortedArray2 = action.payload === 'asc' ?
                state.countries.sort(function (a, b) {
                    if (a.population > b.population) return 1;
                    if (b.population > a.population) return -1;
                    return 0;
                }) :
                state.countries.sort(function (a, b) {
                    if (a.population > b.population) return -1;
                    if (b.population > a.population) return 1;
                    return 0;
                });
            return {
                ...state,
                countries: sortedArray2
            };
        case FILTER_BY_CONTINENTS:
            const filter = state.allCountries;
            const contin = filter.filter((p) => p.continents === action.payload);
            const allCont = action.payload === 'All' ? filter : contin;
            console.log(allCont, 'soy allCont')
            return {
                ...state,
                countries: allCont,
            }

        case FILTER_BY_ACTIVITIES:
            const filterActivities = state.allCountries;
            const ActivitiesDB = filterActivities.filter((p) => p.activities.map((t) => t.name).includes(action.payload));
            const allAct = action.payload === 'All' ? filterActivities.filter(e => e.activities.length > 0) : ActivitiesDB;
           
            return {
                ...state,
                countries: allAct,
            }
        default:
            return state;
    }
}
export default rootReducer;