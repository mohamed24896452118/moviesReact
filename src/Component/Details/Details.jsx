import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'



export default function Details() {
    const [itemDetails, setItemDetails] = useState({});
    let params = useParams();
   
    useEffect(()=> {
        getItemsDetails();
        } , [])
        
         let getItemsDetails= async()=>{
            let {data}=await axios.get(`https://api.themoviedb.org/3/${params.mediaType}/${params.id}?api_key=c636ed7787cc302d96bf88ccf334e0d8&language=en-US`);
            // console.log(data.results);
          setItemDetails(data);
          }

  return (
  <>
<div className="row py-4">
    <div className="col-md-3">
        {params.mediaType=='person'?
        <img className='w-100' src={"https://image.tmdb.org/t/p/w500"+ itemDetails.profile_path} alt="" />:
        <img className='w-100' src={"https://image.tmdb.org/t/p/w500"+ itemDetails.poster_path} alt="" />
    }
    </div>
    <div className="col-md-9">
        <h2>{itemDetails.title} {itemDetails.name}</h2>
        <p className='text-muted my-3'>{itemDetails.overview} {itemDetails.biography}</p>
    </div>
</div>
  </>
  )
}
