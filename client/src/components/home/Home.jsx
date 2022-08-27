import {useEffect, useState} from 'react';
import { useDispatch,useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import {cleanDetails, filterByActivities, filterByContinents, getActivities, getCountries, orderByAlfa, orderByPopulation } from '../../actions';
import { CountriesCard } from '../countriesCard/CountriesCard';
import { Paginado } from '../paginado/Paginado';
import { SearchBar } from '../searchBar/SearchBar';
import './home.css'

export const Home = ()=>{
    const continents1=['Africa',
     'South America', 
     'Antarctica', 
     'Europe', 
     'Oceania',
     'North America',
    'Asia']
   
    const state = useSelector(state=>state)
    const dispatch = useDispatch()
    const countryPP= 10
    const [/* order */, setOrder] = useState('')
    const[currentPage, setCurrentPage]= useState(1)
    const lastCountry = currentPage * countryPP -1
    const indexFirstCountry = currentPage === 1? 
    lastCountry - (countryPP - 1):
    lastCountry - countryPP; 
    const currentCountries= state.countries.slice(indexFirstCountry, lastCountry)
    const nextPage= currentPage + 1;
    const prevPage= currentPage - 1;
   
    const paginado =(pag)=>{
        setCurrentPage(pag)
    };
    const handleNext=()=>{
        setCurrentPage(nextPage) 
    }
    const handlePrev= ()=>{
        setCurrentPage(prevPage)
    }
    const handleFilterByActivities=(e)=> {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterByActivities(e.target.value));
    };
    const handleFilterByContinents=(e)=> {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterByContinents(e.target.value));
    };

    const handleOnClick=(e)=>{
        e.preventDefault(e)
        dispatch(getCountries())
        state.error1=null
    };

    const handleOrderByName=(e)=> {
        e.preventDefault();
        dispatch(orderByAlfa(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value)        
    };
    const handleOrderByPopulation=(e)=> {
        e.preventDefault();
        dispatch(orderByPopulation(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value)        
    };

    useEffect(()=>{
        dispatch(getCountries())
        return ()=>{
            dispatch(cleanDetails())
        }
     },[dispatch])

     useEffect(() => {
        dispatch(getActivities());
        return ()=>{
            dispatch(cleanDetails())
        }
    }, [dispatch]);

    return (
        <div className='body'> 
        <div className='menu'>
            <nav className='nav'>
            <br />
            <div className='menuLinks'>
            <Link className='link' to='/home/create/activities'> Activity List </Link>
            <Link className='link' to='/home/create'> Crear Activity </Link>
            <Link className='link' to='/'>Beginning</Link>
            </div>
            <SearchBar setCurrentPage={setCurrentPage}/>
            <Paginado
                handleNext={handleNext}
                handlePrev={handlePrev}
                countries={state.countries.length}
                currentPage={currentPage}
                countryPP={countryPP}
                paginado={paginado}
                nextPage={nextPage}
                prevPage={prevPage} 
                />
                <button 
                className='button-85'
                onClick={e=>{handleOnClick(e)}}>Recharge countries</button>
            <div className='filters'>
            <select onChange={(e) => handleFilterByActivities(e)} defaultValue='Filter By Activity'>
            <option disabled>Filter Activities</option>
            <option value='All'>All Activities</option>
            {state.activities.map((t,i) => {
                return <option 
                value={t.name} 
                key={i}>{t.name}</option>
            })}
             </select>
             <select onChange={e => handleOrderByName(e)} defaultValue='Order By Alfa'>
                <option disabled>Order By Alfa</option>
                <option value='asc'>A-Z</option>
                <option value='desc'>Z-A</option>
            </select>
            <select onChange={e => handleOrderByPopulation(e)} defaultValue='Order By Population'>
                <option disabled>Order By Population</option>
                <option value='asc'>Menor a mayor</option>
                <option value='desc'>Mayor a menor</option>
            </select>
            <select onChange={(e) => handleFilterByContinents(e)} defaultValue='Filter By Continents'>
            <option disabled>Filter Continents</option>
            <option value='All'>All Continents</option>
            {continents1.map((t,i) => {
                return <option 
                value={t} 
                key={i}>{t}</option>
            })}
            </select>
            </div>
            </nav>
            <div className='ordenarPaises'>
                {currentCountries && currentCountries.map((c,i)=> {
                    return (
                        <Link to={'/home/' + c.id} key={i}>
                            <CountriesCard
                                key={i}
                                flag={c.flag}
                                name={c.name}
                                continents={c.continents} />
                        </Link>)
                })}
            </div>
            </div>
</div>
    )
}