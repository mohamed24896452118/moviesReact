import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


export default function Movies({itemsNum}) {

  const [trendingMovies, setTrendingMovies] = useState([]);
useEffect(()=> {
getTrendingMovies();
} , [])

 let getTrendingMovies= async()=>{
    let {data}=await axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=c636ed7787cc302d96bf88ccf334e0d8');
    // console.log(data.results);
  setTrendingMovies(data.results);
  }

  return (
    <>
    <div className="row my-3 py-5">
  <div className="col-md-4">
    <div>
      <div className="brdr w-25 mb-3"></div>
      <h3>Trending</h3>
      <h3>Movies</h3>
      <h3>To watch now</h3>
      <span className='mb-5 text-muted'>most watched movies by day</span>
      <div className=" brdr w-100 mt-3"></div>
    </div>
  </div>
  {trendingMovies.slice(0,itemsNum).map((item , index)=>
  <div key={index} className="col-md-2 position-relative">
<Link className='nav-link' to={`/details/${item.id}/${item.media_type}`}>
<div className="item">
    <img className='w-100' src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="" />
    <h6>{item.title}{item.name}</h6>
    <span className='position-absolute top-0 end-0 p-2 bg-info'>{item.vote_average.toFixed(1)}</span>
  </div>
</Link>
</div>
  )}
</div>
    </>
  )
}
