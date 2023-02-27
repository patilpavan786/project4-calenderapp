import React, { useEffect } from "react";
import style from "./Homepage.module.css";
import Navbar from "../../Atom/Navbar/Navbar";
import Leftsection from "../../Sections/Leftsection/Leftsection";
import Rightsection from "../../Sections/Rightsection/Rightsection";
import { useRecoilValue } from "recoil";
import { IsLogin } from "../../Recoil/Atom";
import { useNavigate } from "react-router-dom";
function Homepage() {
  const nevigate = useNavigate();
  let isUserLoggedIn = useRecoilValue(IsLogin);

  useEffect(() => {
    if (!isUserLoggedIn) {
      nevigate("/");
    }
  });
  return (
    <div className={style.main}>
      <div className={style.Top}>
        <Navbar />
      </div>
      <div className={style.Bottom}>
        <div className={style.Leftsection}>
          <Leftsection />
        </div>
        <div className={style.Rightsection}>
          <Rightsection />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
