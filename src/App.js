
import React from "react";
import Homepage from "./Pages/Homepage/Homepage";
import Register from "./Pages/Register/Register";
import { BrowserRouter,Routes ,Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
const App= () => {

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/Register" element={<Register />} />
    <Route path="/" element={<Login />} />
    <Route path="/Homepage" element={<Homepage />} />
    
      </Routes>
    </BrowserRouter>
  );
};
export default App;

