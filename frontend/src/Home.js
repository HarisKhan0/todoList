import React from 'react';
import './Home.css'

const Home = () => {
    return (
        <div className= "GrayRectangle">
            <div className= "ListIt">ListIt!</div> 
                <div className= "block" onClick={event =>  window.location.href='/table'}>
                    <h1 className= "buttontext">Enter ListIt!</h1>
                </div> 
        </div>
    )
};

export default Home;