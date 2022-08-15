import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchNameActivity} from "../../actions";
import './searchBarActivity.css'

export const SearchBarActivity = () => {
    const [search, setSearch] = useState('');
    const dispatch= useDispatch()
    const state= useSelector(state=>state)

    
    const handleOnChange = (e) => {
        e.preventDefault()
        setSearch(e.target.value)
    }
    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(searchNameActivity(search))
        setSearch('')
    }
    return (
        <div>
            <form
            className='searchContainer'
            onSubmit={(e)=>{handleOnSubmit(e)}}>
            <div>
                <input
                    placeholder='Search by name'
                    onChange={(e) => { handleOnChange(e) }}
                    value={search} />
            </div>
            <div>
                <button className='buttonSearch'
                    type='submit'>Search</button>
            </div>
            </form>
            { state.error && typeof state.error === 'string'?
              <p><span style={{color:'red'}}>{state.error}</span></p>: null}
        </div>
    )
}