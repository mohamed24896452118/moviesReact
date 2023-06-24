import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import homeStyle from './Home.module.scss';
import Movies from '../Movies/Movies';
import Tv from '../Tv/Tv';
import People from '../People/People';
export default function Home() {
let itemsNum =13;

const [trendingItems, setTrendingItems] = useState([]);
useEffect(()=> {
getTrendingItems();
} , [])

 let getTrendingItems= async()=>{
    let {data}=await axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=c636ed7787cc302d96bf88ccf334e0d8');
  setTrendingItems(data.results);
  }
  return (
  <>
<Movies itemsNum={itemsNum}/>
<Tv/>
<People/>
  </>
  )
}
