import React from "react";

function CustomButton(props) {
  return (
    <div>
      <button onClick={props.onClick} className={props.className}>
        {props.buttonText}
      </button>
    </div>
  );
}

export default CustomButton;
