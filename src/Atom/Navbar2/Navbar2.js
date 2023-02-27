import React, { useState } from "react";
import style from "./Navbar2.module.css";
import AppleIcon from "@mui/icons-material/Apple";
import CustomButton from "../CustomButton/CustomButton";
function Navbar2() {
  return (
    <div className={style.main}>
      <span className={style.logo}>
        <AppleIcon style={{ fontSize: "60px" }} />

        <CustomButton
          buttonText="+"
          className={style.CustomButton}
        ></CustomButton>
      </span>

      <div>
        <input className={style.input} placeholder="search" />
      </div>
    </div>
  );
}

export default Navbar2;
