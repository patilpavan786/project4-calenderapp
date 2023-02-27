import React, { useState, useEffect } from "react";
import CustomButton from "../../Atom/CustomButton/CustomButton";
import CustomInput from "../../Atom/CustomInput/CustomInput";
import style from "./Login.module.css";
import { useNavigate, NavLink } from "react-router-dom";
// import Navbar2 from "../../Atom/Navbar2/Navbar2";
import { useSetRecoilState } from "recoil";
import { IsLogin } from "../../Recoil/Atom";
import swal from "sweetalert";
import Navbar from "../../Atom/Navbar/Navbar";
function Login() {
  let setLogin = useSetRecoilState(IsLogin);
  const [news, setNews] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let nevigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userlist")) {
      const data = JSON.parse(localStorage.getItem("userlist"));
      console.log(data);
      setNews(data);
    }
  }, []);
  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let getNewData = news.filter(
      (e) => e.email === email && e.password === password
    );
    if (getNewData.length > 0) {
      setLogin(true);
      localStorage.setItem("currentuser", JSON.stringify(getNewData));
     
      swal({
        title: "Login Successful!",
        text: "Congratulations! You Are Succesfully Login!",
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
          nevigate("/Homepage");
        }})
     
    } else {
      swal({
        title: "User not found!",
        text: "Enter valid credentials!",
        icon: "error",
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
  };

  return (
    <>
      <div className={style.wrapper}>
        <Navbar />
        <div className={style.container}>
          <form onSubmit={handleSubmit}>
            <div></div>

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
            <CustomButton buttonText="LogIn" className={style.btn} />
            <h5>
              don't have an account?{" "}
              <NavLink style={{ color: "blue" }} to="/Register">
                Register page
              </NavLink>
            </h5>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
