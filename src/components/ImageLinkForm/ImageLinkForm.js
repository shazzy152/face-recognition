import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange,onButtonClick }) => {
    return (
        <div className='f3'>
            <p className='f2 mb3'>{'Upload an Image to Detect Faces'}</p>
            <p className='f4 mt0'>{'Enter URL below'}</p>
            <div className="center">
                <div className="form center pa4 br3 shadow-3">
                    <input className='f4 pa2 w-70 center br2' type='text' onChange={onInputChange} />
                    <button onClick={onButtonClick} className='w-30 grow f4 link ph3 pv2 dib br2' style={{cursor:'pointer'}}>Detect</button>
                </div>
            </div> 
        </div>
    )
}

export default ImageLinkForm
