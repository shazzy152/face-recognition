import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({ imageURL,box }) => {
    return (
        <div className="center ma pa2">
            <div style={{position:"relative"}}>
                <img id="inputimage" className="" alt="" src={imageURL} width='500px' height='auto' />
                <div className="boundingBox" style={{ top:box.topRow, right:box.rightCol, bottom:box.bottomRow, left:box.leftCol}}></div>
            </div>
        </div>
    )
}

export default FaceRecognition;
