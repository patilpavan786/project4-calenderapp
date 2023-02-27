

import { atom } from "recoil";

let currentuser = JSON.parse(localStorage.getItem("currentuser")) || "";
 let localcards = JSON.parse(localStorage.getItem("card") || "[]")
localcards= localcards.filter(card => card.userData.includes(currentuser.id))

 // let newfiltercards=[]

// let cardId = [];
// for (let i = 0; i < localcards.length; i++) {
//   cardId.push(localcards[i].currentuserid
//     );
// }

// let userId = [];
//   userId.push(currentUserdata[0].id);
 
  // let getNewData =  cardId.filter(
  //   (e) => e===(userId)
  // );
//   let getNewData = localcards?.filter((x)=> x?.currentuserid === currentUserdata[0]?.id)
//   newfiltercards.push(getNewData)

// console.log(newfiltercards)
// console.log(cardId)


const monthNames = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const currDate = new Date();
const defaultDate = {
  day: dayNames[currDate.getDay()],
  date: currDate.getDate() + "",
  month: monthNames[currDate.getMonth()],
  year: currDate.getFullYear() + "",
};
export const IsLogin = atom({
  key: "IsLogin",
  default: false,
});

export const Currentdate = atom({
  key: "Currentdate",
  default: defaultDate,
});

export const NewTask = atom({
  key: "NewTask",
  default: [...localcards],
});

export const Card = atom({
  key: "Card",
  default: [],
});

export const IsSubmite = atom({
  key: "IsSubmite",
  default: false,
});