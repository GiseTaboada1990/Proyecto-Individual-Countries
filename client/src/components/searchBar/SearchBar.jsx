import React from 'react';
import { useState } from 'react';
import { searchName } from '../../actions';
import { useDispatch, useSelector} from 'react-redux';
import './searchBar.css'



export const SearchBar = ({setCurrentPage}) => {  
    const [search, setSearch] = useState(''); 
    const dispatch= useDispatch()
    const state= useSelector(state=>state)


    const handleOnChange =(e)=>{
        e.preventDefault()
        setSearch(e.target.value)
        setCurrentPage(1)
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(searchName(search))
        setSearch('')
    }
      return (
          <div>
                <form className='searchBarContainer'
                onSubmit={(e)=>{handleOnSubmit(e)}}>
              <div>
                  <input
                      placeholder='Find by name'
                      onChange={(e) => { handleOnChange(e) }}
                      value={search} />
              </div>
              <div>
                  <button className='button-85'
                          type='submit'>Search</button>
              </div>
              </form>
              { state.error1 && typeof state.error1 === 'string'?
              <p>{state.error1}</p>: null}

          </div>
    )
}