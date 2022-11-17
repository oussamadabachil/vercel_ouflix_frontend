import styles from '../styles/Movies.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faStar, faHeart, faEye,faPlay} from "@fortawesome/free-solid-svg-icons"

import { useState } from 'react';
function Movies(props) {


    let buttonCss = {}
    const [switchCssDetails,setSwitchCssDetails] = useState(false)
    const [likes,setLikes]=useState([])
    const [likeBool,setLikeBool] = useState(false)
    const [detailsName , setDetailsName] = useState()
    const [detailsImg , setDetailsImg] = useState()
    const [detailsOverview , setDetailsOverview] = useState()
    const [detailsReleaseDate , setDetailsReleaseDate] = useState()
    const [detailsVoteAvergae , setDetailsVoteAvergae] = useState()
    const [detailsVoteCount , setDetailsVoteCount] = useState()


    console.log(props)
    let containerCss = {}

    const buttonEye = ()=>{
        setDetailsVoteCount(props.voteCount)
        setDetailsVoteAvergae(props.voteAverage)
        setDetailsReleaseDate(props.dateRelease)
        setDetailsName(props.title)
        setDetailsImg(props.poster)
        setDetailsOverview(props.overviewEx)
        props.eyeButton(switchCssDetails,detailsName,detailsImg,detailsOverview, detailsReleaseDate,detailsVoteAvergae,detailsVoteCount)
        if(!switchCssDetails){
            setSwitchCssDetails(switchCssDetails=true)
        }else{
            setSwitchCssDetails(switchCssDetails=false)
        }
    }
    const likeButton = ()=>{  
    props.recupererVal(props.title);
        if(!likeBool){
            setLikeBool(likeBool=true)
        }else{
            setLikeBool(likeBool=false)
        }
    }
 
    if(likeBool){
        buttonCss={
            'color':'red',
            'transition':'all .3s'
        }
        containerCss={
            'box-shadow':'rgba(255, 0, 0, 0.4) 0px 7px 29px 0px',
            'transition':'all .3s'
        }
    }else{
        buttonCss={
            'color':'black',
            'transition':'all .3s'
        }
    }



  return (
    <div className={styles.container} style={containerCss} arrayLike={likes}>
        <h2>{props.title}</h2>
        <img src={props.poster}alt={props.title}></img>
            <div className={styles.textContainer}>
                <p>Synopsis : </p>
                <p>{props.overview}</p>
            </div>
            <div className={styles.buttonContainer}>
                <span><FontAwesomeIcon icon={faHeart} style={buttonCss} onClick={()=>likeButton()} /></span>
                <span><FontAwesomeIcon icon={faEye} onClick={()=>buttonEye()}/></span>
                <span><FontAwesomeIcon icon={faPlay} /></span>
            </div>
    </div>
  );
}

export default Movies;
