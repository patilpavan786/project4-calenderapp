import React from "react";
import { useRecoilValue } from "recoil";
import style from "./Leftsection.module.css";
import { Currentdate } from "../../Recoil/Atom";
import HourCalender from "../../Component/HourCalender/HourCalender";

function Leftsection() {
  const selectedDate = useRecoilValue(Currentdate);

  // console.log(selectedDate);
  return (
    <div className={style.parent}>
      <div className={style.main}>
        <div className={style.date}>
          <h1> {selectedDate.month}</h1>
          <h1  style={{ color: "blue" }}> {selectedDate.date},</h1>
          <h1>{selectedDate.year}</h1>
        </div>
        <div className={style.day}>
          <h1> {selectedDate.day}</h1>
        </div>
      </div>
      <div className={style.HourCalenderContainer} >
        <HourCalender />
      </div>
    </div>
  );
}

export default Leftsection;
