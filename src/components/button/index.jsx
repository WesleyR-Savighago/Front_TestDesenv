import React from "react";
import "./style.css";

const ButtonComponent = ({
  onClick,
  styleClass = "default-button",
  children,
}) => {
  return (
    <button className={styleClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtonComponent;
