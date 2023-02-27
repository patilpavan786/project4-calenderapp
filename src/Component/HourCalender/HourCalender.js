import React, { useState, useEffect } from "react";
import style from "./HourCalender.module.css";
import Dialog from "@mui/material/Dialog";
import Event from "../Event/Event";
import Swal from "sweetalert2";
import { useRecoilState, useRecoilValue } from "recoil";
import CustomButton from "../../Atom/CustomButton/CustomButton";
import swal from "sweetalert";
import { Card } from "../../Recoil/Atom";
import { NewTask, Currentdate, IsSubmite } from "../../Recoil/Atom";
import { StyleOutlined } from "@mui/icons-material";
function HourCalender() {
  let selecteddate = useRecoilValue(Currentdate) || "";
  const TimeZone = [
    { id: 1, time: "00:00" },
    { id: 2, time: "1:00" },
    { id: 3, time: "2:00" },
    { id: 4, time: "3:00" },
    { id: 5, time: "4:00" },
    { id: 6, time: "5:00" },
    { id: 7, time: "6:00" },
    { id: 8, time: "7:00" },
    { id: 9, time: "8:00" },
    { id: 10, time: "9:00" },
    { id: 11, time: "10:00" },
    { id: 12, time: "11:00" },
    { id: 13, time: "12:00" },
    { id: 14, time: "13:00" },
    { id: 15, time: "14:00" },
    { id: 16, time: "15:00" },
    { id: 17, time: "16:00" },
    { id: 18, time: "17:00" },
    { id: 19, time: "18:00" },
    { id: 20, time: "19:00" },
    { id: 21, time: "20:00" },
    { id: 22, time: "21:00" },
    { id: 23, time: "22:00" },
    { id: 24, time: "23:00" },
    { id: 25, time: "24:00" },
  ];
  const getissubmite = useRecoilValue(IsSubmite);
  const [newData, setNewData] = useRecoilState(NewTask);
  const [a, setA] = useState(null);
  const [card, setCard] = useRecoilState(Card);
  const [list] = useState(TimeZone);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventDialogue, setShowEventDialogue] = useState(false);

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: style["YesBtn"],
      cancelButton: style["NoBtn"],
    },
    buttonsStyling: false,
  });

  const handleClickOpen = (x) => {
    setSelectedEvent({
      starttime: x.time,
      endtime: x.time,
    });
    setShowEventDialogue(true);
  };

  const handleClose = (x) => {
    setShowEventDialogue(false);
  };

  useEffect(() => {
    localStorage.setItem("card", JSON.stringify(newData));
  }, [newData]);

  function handleClick(id,e) {
    e.stopPropagation();
    let newCard = newData.filter((x) => x.id === id);
    setCard(newCard);
    console.log(card);
  }

  function handleDelete(id, e) {
    e.stopPropagation();
    setShowEventDialogue(false);

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          setNewData(newData.filter((x) => x.id !== id));
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Don,t worry Your file is safe :)",
            "error"
          );
        }
      });
  }

  useEffect(() => {
    setShowEventDialogue(true);
    // console.log(selectedEvent, "selected event");
  }, [selectedEvent]);

  const handleEdit = (y, id) => {
    setA(y);

    setShowEventDialogue(true);
    console.log(id);
    if (getissubmite===true) {
      setNewData(newData.filter((x) => x.id !== id));
    }
  };


  function comparedate(date1, date2) {
    if (date1?.year !== date2.year) {
      return false;
    }
    if (date1?.month !== date2.month) {
      return false;
    }
    if (date1?.date !== date2.date) {
      return false;
    }
    return true;
  }


  return (
    <>
      {list.map((x, index) => {
        return (
          <div className={style.main} key={index}>
            <div className={style.hour}>
              <a onClick={() => handleClickOpen(x)}>{x.time}</a>
              <hr
                style={{ height: "0", width: "51rem", marginTop: "0.7rem" }}
                onClick={() => handleClickOpen(x)}
              />
            </div>

            {x.time === selectedEvent?.starttime && selectedEvent?.endtime && (
              <Dialog
                open={showEventDialogue}
                onClose={() => handleClose(x)}
                className={style.fullScreenDialog}
              >
                <Event eventDetails={a} />
              </Dialog>
            )}

            <div className={style.Accordian} onClick={() => handleClickOpen(x)}>
              {newData
                .filter((x) => comparedate(x.selectedDate, selecteddate))
                .map(
                  (el) =>
                    el?.startTime?.hr === parseInt(x.time.split(":")[0]) && (
                      <div
                        className={style.TaskCard}
                        onClick={(event) => handleClick(el.id,event)}
                      >
                        <div className={style.innercard1}>
                          <h2>{el.title}</h2>
                          <a>{el.description}</a>
                          <h3>TAG:-</h3>

                          {el.userData.map((x) => {
                            return (
                              <span className={style.tag}>
                                <a>{x}</a>
                              </span>
                            );
                          })}
                        </div>
                        <div className={style.innercard2}>
                          <span className={style.cardtime}>
                            <h4>From</h4>
                            <a>{el.startTime.hr}:</a>
                            <a>{el.startTime.min}</a>

                            <h4>To</h4>
                            <a>{el.EndTime.hr}:</a>
                            <a>{el.EndTime.min}</a>
                          </span>

                          <span className={style.btn}>
                            <CustomButton
                              onClick={() => handleEdit(el, el.id)}
                              buttonText="edit"
                              className={style.button1}
                            />
                            <CustomButton
                              onClick={(event) => handleDelete(el.id, event)}
                              buttonText="Delete"
                              className={style.button}
                            />
                          </span>
                        </div>
                      </div>
                    )
                )}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default HourCalender;
