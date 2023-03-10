import React, { useState, useEffect } from "react";
import CustomButton from "../../Atom/CustomButton/CustomButton";
import style from "./Event.module.css";
import { useRecoilState, useRecoilValue,useSetRecoilState } from "recoil";
import { NewTask, Currentdate,IsSubmite } from "../../Recoil/Atom";
import TimePicker from "react-time-picker";
import { nanoid } from "nanoid";
import Multiselect from "multiselect-react-dropdown";
import swal from "sweetalert";
function Event({eventDetails }) {
  let localData = JSON.parse(localStorage.getItem("userlist"));
  let currentuser = JSON.parse(localStorage.getItem("currentuser"));
let selectedUsers = eventDetails ? localData.filter(user=> eventDetails.userData.includes(user.id)):[]
  const [title, setTitle] = useState(eventDetails?.title||"");
  const [description, setDescription] = useState(eventDetails?.description||"");
  const [task, setTask] = useRecoilState(NewTask);
 const setisSubmite  =useSetRecoilState (IsSubmite)
  const [starttime, setStartTime] = useState(eventDetails?.starttime||"10:00");
  const [endtime, setEndTime] = useState(eventDetails?.endtime||"10:00");
  const [userData, setUserData] = useState([]);
  const [option, setOption] = useState(localData);
  const selectedDate = useRecoilValue(Currentdate);


  useEffect(() => {
    let username = [];
    let localData = JSON.parse(localStorage.getItem("userlist"));
    for (let i = 0; i < localData.length; i++) {
      username.push({label:localData[i].fname,
      value:localData[i].id
      });
      setOption(username);
    }
  }, []);

  
  let startHour = parseInt(starttime?.split(":")[[0]]);
  const startMin = parseInt(starttime?.split(":")[[1]]);

  let EndHour = parseInt(endtime?.split(":")[[0]]);
  const EndMin = parseInt(endtime?.split(":")[[1]]);

  useEffect(() => {
    
    localStorage.setItem("card", JSON.stringify(task));
  }, [task]);

  function handleSubmite() {


    let Newdata = {
      id: nanoid(2),
      startTime: {
        hr: startHour ,
        min: startMin || "00",
      },
      EndTime: {
        hr: EndHour || "00",
        min: EndMin || "00",
      },
      title,
      description,
      userData:[...userData.map(user=> user.id),currentuser.id],
      selectedDate,

    };

    setTask([Newdata, ...task]);
    setisSubmite(true)
    setTitle("")
    setDescription("")
    setStartTime("")
    setEndTime("")
    setUserData('')

    swal({
      title: "good job!",
      text: "task Succesfully added!",
      icon: "success",
      buttons: {
        confirm: {
          text: "Okay",
          value: true,
          visible: true,
          className: style["SweetAlertButton"],
          closeModal: true,
        },
      },
      dangerMode: false,
    });
  }

  return (
    <div className={style.parent}>
      <h1>Add Task :-</h1>
      <input
        placeholder="Add task"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={style.input}
      />
      <h2>Add description :-</h2>
      <input
        className={style.input2}
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        placeholder="Add description"
      />
      <span>
        From <TimePicker onChange={setStartTime} value={starttime} />
        To <TimePicker onChange={setEndTime} value={endtime} />
      </span>

      <Multiselect
        isObject={true}
        options={localData}
        showCheckbox
        displayValue="fname"
        selectedValues={selectedUsers}
        onRemove={(e) => {
          setUserData(e);
        }}
        onSelect={(e) => {
          setUserData(e);
        }}
      />

      <CustomButton
        buttonText="Submit"
        onClick={handleSubmite}
        className={style.btn}
      />
    </div>
  );
}

export default Event;
