import React, { useState } from "react";
import style from "./Navbar.module.css";
import AppleIcon from "@mui/icons-material/Apple";
import { animateScroll as scroll } from "react-scroll";
import CustomButton from "../CustomButton/CustomButton";
import {useRecoilState } from "recoil";
import Dialog from "@mui/material/Dialog";
import { IsLogin } from "../../Recoil/Atom";
import Event from "../../Component/Event/Event";
function Navbar() {
  let [isUserLoggedIn,setIsUserLoggedIn] = useRecoilState(IsLogin);
  let user = JSON.parse(localStorage.getItem("currentuser")) || "";
  const [data] = useState(user);
  const [showEventDialogue, setShowEventDialogue] = useState(false);

  const handleClickOpen = () => {
    setShowEventDialogue(true);
  };

  const handleClose = () => {
    setShowEventDialogue(false);
  };
function handleLogout(){
  setIsUserLoggedIn(false)
}
  return (
    <div className={style.main}>
      <span className={style.logo}>
        <AppleIcon
          style={{ fontSize: "48px" }}
          onClick={() => scroll.scrollToTop()}
        />
      
          {isUserLoggedIn && (
            <>
         <CustomButton
         onClick={handleClickOpen}
         buttonText="+"
         className={style.CustomButton}
       ></CustomButton>
       <CustomButton buttonText="LogOut"  className={style.logoutbtn1} onClick={handleLogout}/>
       </>
        )}

        
        <Dialog
          open={showEventDialogue}
          onClose={handleClose}
          className={style.fullScreenDialog}
        >
          <Event />
        </Dialog>
      </span>

      <div className={style.inner2}>
        {isUserLoggedIn && (
          <>
          <CustomButton buttonText="LogOut"  className={style.logoutbtn2} onClick={handleLogout}/>
          <span className={style.welcome}>
            <h2 className={style.WelcomeHeading}>Welcome,</h2>
            <h2>{data[0]?.fname}</h2>
          </span>
          </>
        )}
        <input className={style.input} placeholder="Search.." />
      </div>
    </div>
  );
}

export default Navbar;
