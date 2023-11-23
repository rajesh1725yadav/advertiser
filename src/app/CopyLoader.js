import React from 'react'
import Lottie from 'lottie-react';
import loder from '../assets/copy.json'

export default function CopyLoader ({visible}) {

    const sts = (visible === true) ? 'block'  : 'none'; 

    return (
            <div className='loadr-outer' style={{display:sts}} >
                <div className='loadr-ovr' ></div>
                <div className='loadr-body'>
                    <div className='text-center'>
                        <Lottie animationData={loder} style={{height:'100px', width:'100px'}} autoPlay={true} loop={true} />
                        <div className='text-primary'>Campaign Copying...</div>
                    </div>
                </div>
            </div>
        )

}