import React from 'react';
import Tilt from 'react-tilt';
import Vslogo from './vs-logo.png'
import './Logo.css';

const Logo = () => {
    return (
        <div className="logodiv" style={{width: 250, marginEnd:0}}>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 30 }} style={{ height: 250, width: 250,cursor:'pointer' }} >
                <div className="Tilt-inner pa3"> 
                    <img style={{paddingTop:'35px'}} alt="logo" src={Vslogo} /> 
                </div>
            </Tilt>   
        </div>
    )
}
 export default Logo;