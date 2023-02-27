import React, { useState } from "react";
import Calender from "../../Component/Calender/Calender";
import style from "./Rightsection.module.css";
import { useRecoilValue } from "recoil";
import { Card } from "../../Recoil/Atom";
function Rightsection() {
  const task = useRecoilValue(Card);
  return (
    <div>
      <div className={style.main}>
        <Calender />
      </div>
      <div className={style.MapContainer} >
        {task.map((x) => {
          return (
            <div className={style.TaskCard}>
              <div className={style.innerCard}>
                <h2>{x.title}</h2>
                <a>{x.description}</a>
                <div className={style.TagPlusName} >
                <h3>TAG:-</h3>

                {x.userData.map((x) => {
                  return (
                    <span className={style.tag}>
                      <a>{x}</a>
                    </span>
                  );
                })}
                </div>
              </div>
              <div className={style.innerCard2}>
                <span>
                  {" "}
                  <a>
                    <strong> Timing :-</strong> {x.startTime.hr}:
                    {x.startTime.min} <strong> To</strong>
                    {x.EndTime.hr}:{x.EndTime.min}{" "}
                  </a>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Rightsection;
