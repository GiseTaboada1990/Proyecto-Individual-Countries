import React from 'react';
import {Link} from 'react-router-dom';
import "./landingPage.css"

export const LandingPage=()=>{
    return (
        <div className='fondo'>
            <h1 className='titulo'>Welcome to the countries app</h1>
            <Link to = '/home'>
                <button className='button-85'>Ingresar</button>
            </Link>
        </div>
    )
}