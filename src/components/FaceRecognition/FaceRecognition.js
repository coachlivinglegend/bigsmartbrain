import React from 'react';
import './FaceRecognition.css';



const FaceRecognition = ({imageUrl, box}) => {
    return (
        <div className='center na'>
            <div className='absolute nt2'>
                <img id="inputImage" alt='' width='500px' height='auto' src={imageUrl}/>  
                <div className='boundingBox' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>

                </div>
            </div>
        </div>
    )
}

export default FaceRecognition