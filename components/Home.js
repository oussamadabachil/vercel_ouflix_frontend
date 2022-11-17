import styles from '../styles/Home.module.css';
import Header from './Header';
import {Animated} from "react-animated-css";

import Movies from './Movies';

import { useState,useEffect } from 'react';
function Home( ) {

let cssDetail = {}
let cssBlur = {}

  const [lastBurger, setLastBurger] = useState([]);
  const [moviesData,setMoviesData] = useState([])
  const [valueCssDetails,setValueCssDetails] = useState()

  const [detailsMovieName,setDetailsMovieName] = useState()

  const [detailsImg , setDetailsImg] = useState()
  const [detailsOverview , setdDetailsOverview] = useState()
  const [detailsReleaseDate , setDetailsReleaseDate] = useState()
  const [detailsVoteAvergae , setDetailsVoteAvergae] = useState()
  const [detailsVoteCount , setDetailsVoteCount] = useState()


  const recupererVal = (name)=>{
    if(lastBurger.find(e=>e===name)){
    setLastBurger(lastBurger.filter(e=>e!==name))
    }else{
      setLastBurger([...lastBurger,name])
    }
  }


  

  const eyeButton = (value,detailsTitle,detailsImgs,detailsOverviews,detailsReleaseDates,voteAverages,voteCount)=>{
    setDetailsVoteCount(voteCount)
    setDetailsVoteAvergae(voteAverages)
    setDetailsReleaseDate(detailsReleaseDates)
    setDetailsMovieName(detailsTitle)
    setDetailsImg(detailsImgs)
    setdDetailsOverview(detailsOverviews )
    setValueCssDetails(value)
    console.log(valueCssDetails,detailsMovieName,detailsOverview,detailsImg,detailsReleaseDate,detailsVoteAvergae)
  }



if(valueCssDetails){

  cssDetail={'opacity':'1','visibility':'visible'}
  cssBlur={'opacity':'1','visibility':'visible'}

}else{

  cssDetail={}


}


  // if(valueCssDetails==true){
  //   console.log("no")

  //   cssDetail = {"opacity":"1","visibility":"visibile"}


  // }else{
  //   console.log("yes")

  // }


  useEffect(() => {
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=ee8d063f9e3483140eea927c147ab7fa')
    .then(response => response.json())
      .then(data => {

        const dataMap = data.results.map((movie,i)=>{
        return {  title  : movie.title,
          poster : "https://image.tmdb.org/t/p/w500"+movie.poster_path,
          voteAverage :movie.vote_average ,
          dateRelease : movie.release_date,
          voteCount :movie.vote_count,
          popularity:movie.popularity,
          overview :movie.overview.substring(0,249)+"...",
          overviewEx :movie.overview
        }
        })
      
        setMoviesData(dataMap)

      });
  }
  , []);


  const movies = moviesData.map((data, i) => {
    // const isLiked = likedMovies.some(movie => movie === data.title);
    return <Movies eyeButton={eyeButton} key={i}  title={data.title} dateRelease={data.dateRelease} recupererVal={recupererVal} overview={data.overview} overviewEx = {data.overviewEx} poster={data.poster} voteAverage={data.voteAverage} voteCount={data.voteCount} />;
  });



  const hidePopUp =()=>{

     setValueCssDetails(valueCssDetails=false)


  }
  return (
    <div>
      <Header lastBurger={lastBurger}/>
      <h1 className={styles.title}>Le nouveau <span class='animate__animated animate__rollIn 5s'>Netflix</span> grauit pour tous<br/>
      
      </h1>
      <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>

      <div className={styles.flexBoxContainer}>

       {movies}
      </div>
      </Animated>

      <div className={styles.popupblur} onClick={()=>hidePopUp()}  style={cssBlur}></div>

      <div className={styles.popupdetail} style={cssDetail}>
        {/* <span><Fon</span> */}

        <div>
          <img src={`${detailsImg}`}  alt={detailsMovieName}></img>
        </div>
        <div>
          <div className={styles.containerResume}>

            <h4>{detailsMovieName}</h4>
            <p>{detailsOverview}</p>

          </div>

          <div className={styles.containerActeur}>

            <h4>Date de sortie</h4>
            <p>{detailsReleaseDate}</p>

            
          </div>

          <div className={styles.containerStat}>

            <h4>Les statistiques du film</h4>

            <ul>
                  <li>Note du public : {detailsVoteAvergae}</li>
                  <li>Nbre de  vote : {detailsVoteCount}</li>
                  <li>Popularité : {detailsVoteAvergae} </li>


            </ul>
            </div>

        <span onClick={()=>hidePopUp()} >X</span>

        </div>
      </div>
    </div>
  );
}

export default Home;
