import React, { useEffect, useState } from 'react'
import axios from './axios';
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer';
import './Row.css'


const base_url = "https://image.tmdb.org/t/p/original"


function Row({title, fetchUrl, isLargeRow})  {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    useEffect(()=>{
        async function fetchData() {

            const request = await axios.get(fetchUrl);
            console.log(request);
            setMovies(request.data.results);
            return request;
          }
        fetchData();
    }, [fetchUrl]); 
    const opts = {
        height: "390",
        width: "99%",
        playerVars: {
          autoplay: 1,
        }
      }

      const handleClick = (movie) => {
        // console.table(movie?.title)
        // if the video is already opened and we click on it , it will close 
        if (trailerUrl) {
          setTrailerUrl('')
        } else {
          movieTrailer(movie?.name || "")
            .then(url => {
              const urlParams = new URLSearchParams(new URL(url).search);
              setTrailerUrl(urlParams.get('v'));
            }).catch((error) => console.log(error));
        }
      }
    console.log(movies)

  return (
    <div className="row">
        <h2>{title}</h2>

        <div className="row__posters">
            {
                movies.map(movie=>(
                    <img 
                    // this key is here to sort of don't rebder the component when something updates or changes
                    key={movie.id}
                    onClick={() => handleClick(movie)}
                    className={`row__poster ${isLargeRow && "row_posterLarge"}`}
                    src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                    alt={movie.name}/>
                    // get the image if it doesn't get the image then the alternatove is mpvie.name
                ))
            }
        </div>
        <div style={{ padding: "40px" }}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  )
}

export default Row