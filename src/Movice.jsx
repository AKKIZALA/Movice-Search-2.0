import React, { useEffect, useState } from "react";
import "./Movice.css";
import no_found from "../src/assets/no-image.png";
import Navbar from "./Navbar";

const Movice = () => {
  const [movice, setmovice] = useState([]);
  const [counter, setcounter] = useState([]);
  const [page, setpage] = useState(1);
  const [search, setsearch] = useState(1);

  const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";
  const IMGPATH = "https://image.tmdb.org/t/p/w1280";
  const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

  const moviceFetch = async (url) => {
    let res = await fetch(url);
    let data = await res.json();
    setmovice(data.results);
  };

  const showmovice = movice.map((elm, ind) => {
    return (
      <div className="box" key={ind}>
        <p className="hd">HD</p>
        <img className="img"
          src={elm.poster_path == null ? no_found : IMGPATH + elm.poster_path}
          alt=""
        />
        <div className="intro">
          <h3 className="title">
            {elm.title.length > 32
              ? `${elm.title.slice(0, 25)}....`
              : elm.title}
          </h3>
          <div className="time">
            <div className="one">
              <h4>{elm.release_date} ●</h4>
              <h4></h4>
            </div>
            <div className="two">
              <h4>Movice</h4>
            </div>
          </div>
        </div>
      </div>
    );
  });

  const keyFunc = (event) => {
    setcounter(event.target.value);
    setsearch(1)
  };

  const handal = () => {
    if (counter.length != 0) {
      moviceFetch(SEARCHAPI + counter + `&page=${search}`);
    } else {
      moviceFetch(APIURL + page);
    }
  };

  const fliphandlar = () => {
    window.scroll(0, 0);
    if (page == 1 || search == 1) {
      page = 1;
      search = 1;
    } else {
      setpage(page - 1);
      setsearch(search - 1);
      console.log(search);
    }
  };
  const fliphandlar2 = () => {
    window.scroll(0, 0);
    setsearch(search + 1);
    setpage(page + 1);
    setsearch(search + 1);
    console.log(search);
  };

  useEffect(() => {}, [handal()]);

  return (
    <>
      <Navbar data={counter} />
      <div></div>
      <div className="main">
        <div className="search-box">
          <input
            type="text"
            placeholder="Go to..."
            autoFocus
            onChange={keyFunc}
          />
        </div>
        <div className="contant">{showmovice}</div>
        <div className="btn_box">
          <button id="next_btn" onClick={fliphandlar} style={search  == 1 ? {display:"none"} : {display:"flex"}}>
            Prev
          </button>
          <button id="next_btn" onClick={fliphandlar2}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Movice;