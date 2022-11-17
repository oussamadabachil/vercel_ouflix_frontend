import styles from '../styles/Header.module.css';
import { Button, Popover } from 'antd';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faStar, faHeart, faEye,faPlay , faCircleXmark} from "@fortawesome/free-solid-svg-icons"

import 'antd/dist/antd.css';

import { useState } from 'react';


function Header(props) {

  // console.log(props.lastBurger)
  // const [ou,setOu]=useState([])

  // setOu([...ou,props.value])
  const likedMoviesPopover = props.lastBurger.map((data, i) => {
    
    return (

      <div key={i} className={styles.likedMoviesContainer}>
        <span className="likedMovie">{data}</span>
        <FontAwesomeIcon icon={faCircleXmark} className={styles.crossIcon} />
     
      </div>
    );
  })

  const popoverContent = (
    <div className={styles.popoverContent}>
      {likedMoviesPopover}
    </div>
  );
  return (
    <div className={styles.header}>
        <ul>
            <li>OUSSFLIX</li>
            <li><Popover title="Liked movies" content={popoverContent} className={styles.popover} trigger="click">
          <Button><FontAwesomeIcon icon={faHeart}/></Button>
        </Popover></li>
        </ul>
      
    </div>
  );
}

export default Header;
