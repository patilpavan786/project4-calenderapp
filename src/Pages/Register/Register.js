import React, { useState, useEffect } from "react";
import CustomButton from "../../Atom/CustomButton/CustomButton";
import CustomInput from "../../Atom/CustomInput/CustomInput";
import style from "./Register.module.css";
import { userDetails } from "../../ConstData/ConstData";
import { useNavigate, NavLink } from "react-router-dom";
// import Navbar2 from "../../Atom/Navbar2/Navbar2";
import swal from "sweetalert";
import { nanoid } from "nanoid";
import Navbar from "../../Atom/Navbar/Navbar";
function Register() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let nevigate = useNavigate();
  function handleChangeFName(e) {
    setFname(e.target.value);
  }
  function handleChangeLName(e) {
    setLname(e.target.value);
  }
  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  useEffect(() => {
    let localData = JSON.parse(localStorage.getItem("userlist")) || [];
    if (localData.length === 0) {
      localStorage.setItem("userlist", JSON.stringify(userDetails));
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    let dataUser = {
      id: nanoid(2),
      fname,
      lname,
      email,
      password,
    };

    let olddata = localStorage.getItem("userlist");
    if (olddata == null) {
      olddata = [];
      olddata.push(dataUser);
      localStorage.setItem("userlist", JSON.stringify(olddata));
    } else {
      let oldArr = JSON.parse(olddata);
      oldArr.push(dataUser);
      localStorage.setItem("userlist", JSON.stringify(oldArr));
    }

    swal({
      title: "Registration Successful!",
      text: "Congratulations! You are signed up!",
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
    }).then((value) => {
      if (value) {
        nevigate("/");
      }})
  
    setFname("");
    setLname("");
    setEmail("");
    setPassword("");
  }
  return (
    <>
      <div className={style.wrapper}>
        <Navbar />
        <div className={style.container}>
          <form onSubmit={handleSubmit}>
            <div></div>
            <CustomInput
              placeholder="FirstName"
              className={style.input}
              type="text"
              onChange={handleChangeFName}
              value={fname}
              required
            />
            <CustomInput
              placeholder="LastName"
              type="text"
              className={style.input}
              onChange={handleChangeLName}
              value={lname}
              required
            />
            <CustomInput
              placeholder="email"
              type="email"
              className={style.input}
              onChange={handleEmail}
              value={email}
              required
            />
            <CustomInput
              placeholder="password"
              type="password"
              className={style.input}
              onChange={handlePassword}
              value={password}
              required
            />
        

            <CustomButton buttonText="Register" className={style.btn} />
            <h5>
              Already have an account?{" "}
              <NavLink style={{ color: "blue" }} to="/">
                Login Page
              </NavLink>
            </h5>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
