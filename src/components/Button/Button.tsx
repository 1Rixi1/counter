import React from "react";

import s from "./Button.module.css";

type ButtonPropsType = {
  title: string;
  disabled: boolean;
  callBack: () => void;
};

const Button: React.FC<ButtonPropsType> = (props) => {
  const { title, disabled, callBack } = props;

  return (
    <button className={s.button} onClick={callBack} disabled={disabled}>
      {title}
    </button>
  );
};

export default Button;
