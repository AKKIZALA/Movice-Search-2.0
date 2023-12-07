import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import Movice from './Movice'

const Navbar = (props) => {
  const [movice , setmovice] = useState([])
  const [hero , sethero] = useState([])
  const [page , setpage] = useState(0)

  const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";
  const IMGPATH = "https://image.tmdb.org/t/p/w1280";


  const moviceFetch = async (url) => {
    let res = await fetch (url)
    let data = await res.json()
    sethero(data.results[page].poster_path)
  }
let maindata
const data1 =  <nav>
<div className="nav_hero" style={{backgroundImage:`url(${IMGPATH + hero})`}}>
<img className="img2" src={IMGPATH + hero} alt="" />
  </div>
</nav>


const data2 =  <nav>
<div className="nav_Search" >
<div id='search_poster'>
<p>Welcome to <strong>Akki Zala's </strong>World</p>
  <h2>Keep Search Your Movice</h2>
  <h1>Here</h1>
</div>
  </div>
</nav>

 useEffect(()=>{
    moviceFetch(APIURL)
    const timer = setTimeout(()=>{
      if(page === 20){
        setpage(0)
      }else{
        setpage(page + 1)
      }
    },3000)
    return ()=> clearTimeout(timer)
  },[page])
  return (
    <>
   {props.data == 0 ? maindata = data1 : maindata = data2}
    </>
  )
}

export default Navbar