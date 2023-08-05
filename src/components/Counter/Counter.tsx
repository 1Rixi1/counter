import React, { MutableRefObject, useEffect, useState } from "react";

import s from "./Counter.module.css";
import Button from "../Button/Button";
import { useLocalValue } from "../../useLocalValue/useLocalValue";

type CounterPropsType = {
  maxValue: number;
  error: string;
  preMessage: string;
};
export const Counter: React.FC<CounterPropsType> = (props) => {
  const { maxValue, error, preMessage } = props;

  const [currentValue, setCurrentValue] = useLocalValue("value", 0);

  useEffect(() => {
    setCurrentValue(localStorage.getItem("value"));
  }, [localStorage.getItem("value")]);

  const [incrDisabled, setIncrDisabled] = useState(false);
  const [resetDisabled, setResetDisabled] = useState(false);

  let showMessage: string | number;

  const isLocalStaticValue = localStorage.getItem("staticValue");

  useEffect(() => {
    setIncrDisabled(false);
    setResetDisabled(false);

    if (
      showMessage === 'Enter and press "set"' ||
      showMessage === "Incorrect Value"
    ) {
      setIncrDisabled(true);
      setResetDisabled(true);
    }

    if (currentValue === maxValue) {
      setIncrDisabled(true);
    }
  }, [currentValue, preMessage]);

  if (isLocalStaticValue !== null) {
    showMessage = currentValue;
  } else if (preMessage) {
    showMessage = preMessage;
  } else {
    showMessage = error;
  }

  const onClickIncrHandler = () => {
    setCurrentValue(Number(currentValue) + 1);
  };

  const onClickResetHandler = () => {
    isLocalStaticValue && setCurrentValue(JSON.parse(isLocalStaticValue));
  };

  const classesMessage =
    typeof showMessage === "number"
      ? showMessage === maxValue
        ? s.limitNumberMessage
        : ""
      : "";

  return (
    <div className={s.wrapperCounter}>
      <div className={s.wrapperShowMessage}>
        <p className={`${s.showMessage} ${classesMessage}`}>{showMessage}</p>
      </div>
      <div className={s.wrapperButtons}>
        <Button
          title={"incr"}
          disabled={incrDisabled}
          callBack={onClickIncrHandler}
        />
        <Button
          title={"reset"}
          disabled={resetDisabled}
          callBack={onClickResetHandler}
        />
      </div>
    </div>
  );
};
