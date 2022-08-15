import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { cleanDetails, getCountries, updateActivity } from '../../actions';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import './createActivity.css'

export const CreateActivity = () => {
    const countries = useSelector(state => state.countries)
    const dispatch = useDispatch()
    const [errores, setErrores] = useState({})
    const season1 = ['Summer', 'Autumn', 'Winter', 'Spring']
    const difficulty1 = ['1 = very easy', '2 = easy', '3 = fair', '4 = difficult', '5 = very difficult']
    const duration1 = ['1 h', '2 hs', '3 hs o mas', '1 dia', '2 dias']
    const [ successfully, setSuccessfully ] = useState(null)
    const history= useHistory()
    
    const activityEdit = useHistory().location.state
    
    const inicialForm = {
        name: activityEdit? activityEdit.name : "",
        season: activityEdit? activityEdit.season : [],
        difficulty: activityEdit? activityEdit.difficulty : null,
        duration: activityEdit? activityEdit.duration: null,
        country: activityEdit? activityEdit.countries.map(e => e.name) : [],
    }
    
    const [input, setInput] = useState(inicialForm)
    const validations = (input) => {
        const regexName = /^[A-z ,í-ñ-Ü-ü]{4,20}$/
        let errors = {};
        if (!input.name) {
            errors.name = 'Este campo es requerido'
        } else if (!regexName.test(input.name)) {
            errors.name = 'El nombre de la actividad debe contener solo letras, ser mayor a 4 caracteres y menor a 20 caracteres'
        }
        if (!input.difficulty) {
            errors.difficulty = 'Este campo es requerido'
        }
        if (!input.season.length) {
            errors.season = 'Este campo es requerido'
        }
        if (!input.duration) {
            errors.duration = 'Este campo es requerido'
        }
        if (!input.country.length) {
            errors.country = 'Este campo es requerido'
        };
        return errors
    }
    const handleOnChange = (e) => {
        if(e.target.name==='season' || e.target.name==='country'){
        if (!input[e.target.name].includes(e.target.value)) {
            setInput({
                ...input,
                [e.target.name]: input[e.target.name].concat(e.target.value)
            })
            setErrores(validations({
                ...input,
                [e.target.name]: input[e.target.name].concat(e.target.value)
            }))
        } else {
            setErrores({
                ...errores,
                [e.target.name]: "Cannot be repeated!",
            })
        }
    }else{
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrores(validations({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
}

    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch])

    const handleDelete = (e,sn) => {
        setInput({
            ...input,
            [e.target.id]: input[e.target.id].filter(el => el !== sn ),
        })
        setErrores(validations({
            ...input,
            [e.target.id]: input[e.target.id].filter(el => el !== sn ),
        }))
    }
    const handleDelete1 = () => {
        setInput({
            ...input,
            duration: null,
        })
        setErrores(validations({
            ...input,
            duration: null,
        }))
    }
    const handleDelete2 = () => {
        setInput({
            ...input,
            difficulty: null,
        })
        setErrores(validations({
            ...input,
            difficulty: null,
        }))
    }
    
    const handleOnSubmit = (e) => {
        e.preventDefault()
        setErrores(validations(input))
        if (Object.keys(errores).length === 0 
            && input.name!==''
            && input.country.length>0
            && input.season.length>0
            && Object.keys(input).length===5){
            if (difficulty1.indexOf(input.difficulty)!== -1) {
                let a = difficulty1.indexOf(input.difficulty) + 1
                input.difficulty = a
            }
            axios.post('http://localhost:3001/activities',input)
            .then(res=>{
                if(res.status === 201) {
                setInput({
                    name: '',
                    season: [],
                    duration:null,
                    difficulty:null,
                    country: []
                })
                alert('successfully created tourist activity')
            }else setSuccessfully({ success: false, message: res.data })
        })
        .catch(error => setSuccessfully({ success: false, message: error.data }))
     
        } else  setErrores({...errores, form: 'Complete the required fields!'})
    }
    const handleEdit=(e, ID)=>{
        e.preventDefault()
        setErrores(validations(input))
        if(Object.keys(errores).length === 0){
            if (difficulty1.indexOf(input.difficulty)!== -1) {
                let a = difficulty1.indexOf(input.difficulty) + 1
                input.difficulty = a
            }
            function confirmacion(){
                var respuesta = window.confirm('Are you sure you want to edit the activity?')
                if (respuesta === true){
                    dispatch(cleanDetails())
                    dispatch(updateActivity(ID,input))
                    .then(res=>{
                        alert(res)
                    })
                }
            } 
            confirmacion()
            history.push('/home')
        } else {
        alert('missing data or errors in data loading')
    }                   
    }

    return (
        <div>
            <br />
            <div className='mLinks'>
            <Link to='/home'>Home</Link>
            <Link className='link' to='/home/create/activities'> Activity List </Link>
            </div>
            <div
            className='containerForm'>
                <form 
                className='form'
            onSubmit={activityEdit ? (e)=>handleEdit(e, activityEdit.ID) :
            (e) => { handleOnSubmit(e) }}
            >
            {successfully ? 
                    <div className='succesMessage'>{successfully.message}</div> 
                :
                    <div className="subtitle">Let's create your tourist activity!</div>  }
                    <div className='inputContainer'>
                <label>Name</label>
                <input
                className='input'
                    name='name'
                    type='text'
                    value={input.name}
                    onChange={(e) => { handleOnChange(e) }}
                    onBlur={() => validations(input)}></input>
                {errores.name && <p>{errores.name}</p>}
                </div>
                <div className='inputContainer'>
                <label>Season</label>
                <select
                className='contentSelect'
                    name='season'
                    value={input}
                    onChange={(e) => {handleOnChange(e) }}>
                        <option></option>
                    {season1 && season1.map((s, i) => (
                        <option className="option" key={i} value={s}>{s}</option>
                    ))}
                </select>
                <div className='divSelect'>
                {input.season && input.season.map((sn, i) => (
                    sn && <span className='cBtn'
                    id="season" key={i}
                    onClick={(e) => {handleDelete(e,sn)}}
                    >{sn}    x   </span>
                    ))}
                {errores.season && <p>{errores.season}</p>}</div>
                    </div>
                <div className='inputContainer'>
                <label>Duration</label>
                <select
                 className='contentSelect'
                    name='duration'
                    value={input}
                    onChange={(e) => { handleOnChange(e) }}>
                    <option></option>
                    {duration1.map((s, i) => { return <option className="option"
                    value={s} key={i}>{s} </option> })}</select>
                    <div className='divSelect'>
                {input.duration
                    && <button 
                        onClick={() => { handleDelete1(input.duration) }}>{input.duration}  x </button>}
                {errores.duration && <p>{errores.duration}</p>}</div>
                </div>
                <div className='inputContainer'>
                <label>Difficulty</label>
                <select
                 className='contentSelect'
                    name='difficulty'
                    value={input}
                    onChange={(e) => { handleOnChange(e) }}>
                    <option></option>
                    {difficulty1.map((s, i) => { return <option className="option"
                    value={s} key={i}>{s}</option> })}</select>
                    <div className='divSelect'>
                {input.difficulty && <button
                    onClick={() => { handleDelete2(input.difficulty) }}>{input.difficulty}  x </button>}
                {errores.difficulty && <p>{errores.difficulty}</p>}</div>
                </div>
                <div className='inputContainer'>
                <label>Country</label>
                <select
                 className='contentSelect'
                    name='country'
                    value={input}
                    onChange={(e) =>{handleOnChange(e)}}>
                        <option></option>
                    {countries && countries.map((c, i) => (
                        <option className="option" key={i} value={c.name}>{c.name}</option>
                    ))}
                </select>   
                <div className='divSelect'>
                {input.country && input.country.map((cn, i) => (
                    cn && <span className='cBtn' 
                    id="country"key={i}
                        onClick={(e) =>{handleDelete(e,cn)}}
                    >{cn}   x  </span>
                ))}
                {errores.country && <p>{errores.country}</p>}</div>
                </div>
                <div className='btnCreate'>
                <button 
                className='button-64'
                type='submit'>Send</button>
                </div>
            </form>
                {errores.form && <p className='erroresForm'>{errores.form}</p>}
            </div>
        </div>
    )
}