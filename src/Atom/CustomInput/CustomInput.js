import React from "react";

function CustomInput(props) {
  return (
    <div>
      <input
        className={props.className}
        onChange={(e) => props.onChange(e, e.target.value)}
        value={props.value}
        type={props.type}
        placeholder={props.placeholder}
        required={props.required}
      />
    </div>
  );
}

export default CustomInput;
