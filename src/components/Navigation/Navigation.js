import React from 'react';

const Navigation = ({ onRoutechange, isSignedin }) => {
    if (isSignedin) {
        return (
            <nav style={{display:'flex',justifyContent:'flex-end',height:50}}>
                <p onClick={() => onRoutechange('signout')} className='f3 link dim black underline pointer pr4'>Sign Out</p>
            </nav>
            )
    } else {
        return(
            <nav style={{display:'flex',justifyContent:'flex-end',height:50}}>
                <p onClick={() => onRoutechange('Signin')} className='f3 link dim black underline pointer pr4'>Sign In</p>
                <p onClick={() => onRoutechange('register')} className='f3 link dim black underline pointer pr4'>Register</p>
            </nav>
            )
    }
    
}

export default Navigation;
