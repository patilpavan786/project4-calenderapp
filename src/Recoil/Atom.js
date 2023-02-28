import { atom } from "recoil";

let currentuser = JSON.parse(localStorage.getItem("currentuser")) || "";
 let localcards = JSON.parse(localStorage.getItem("card") || "[]")
localcards= localcards.filter(card => card.userData.includes(currentuser.id))

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