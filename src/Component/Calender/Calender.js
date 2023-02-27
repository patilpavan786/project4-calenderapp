import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import style from "./Calender.module.css";
import { useRecoilState } from "recoil";
import { Currentdate } from "../../Recoil/Atom";

function Calender() {
  const [selectedDate, setSelectedDate] = useRecoilState(Currentdate);




  const onChange = (date) => {
    let arr = date.toString().split(" ");
    setSelectedDate({ day: arr[0], month: arr[1], date: arr[2], year: arr[3] });

  };

  return (
    <div className={style.main}>
      <Calendar
        className={style.CalendarExperiment}
        onChange={onChange}
        value={new Date()}
      />
    </div>
  );
}

export default Calender;
