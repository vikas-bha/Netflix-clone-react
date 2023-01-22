import React, { useEffect, useState } from 'react';
import axios from './axios'
import requests from './requests';
import './Banner.css'
const Banner = () => {
    const [movie, setMovie] = useState([]);

    useEffect(()=>{
        async function fetchData(){
            const request =  await axios.get(requests.fetchNetflixOriginals);
            console.log(request.data.results); // this array will have a bumch of mpvies 
            
            console.log(request.data.results[
                Math.floor(Math.random()* request.data.results.length -1)
            ]);

            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length -1)
                ]
            )
            // this will randomly select the movie and then console log it 
                return request;
        }
        fetchData();
    }, []);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
      }
    
  return (
    <header className="banner"
    style={{
        backgroundSize: "cover",
        backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
           
        )`,
        backgroundPosition: "center center"
    }}>
         {/* // this question mark is that ts thing we do  , if it exists okay if it doesn't don't freak out */}
        <div className="banner_contents">
            <h1 className="banner_title">{movie?.title || movie?.name || movie?.original_name }</h1>

            <div className="banner_buttons">
                <button className="banner_button">Play</button>
                <button className="banner_button">My List</button>
            </div>

            <h1 className="banner_description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora voluptates facilis laboriosam ipsa tenetur error?</h1>

        

        </div>
        
        <div className="banner--fadeBottom"/>
        {/* this is a modifier fadeBottom ,it's only purpose is to make the banner look nice */}
    </header>
  )
}

export default Banner