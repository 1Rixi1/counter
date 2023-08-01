import React, { MutableRefObject, useEffect, useState } from "react";

import s from "./Counter.module.css";
import Button from "../Button/Button";

type CounterPropsType = {
  value: number;
  maxValue: number;
  error: string;
  // preMessage: { text: string };
  preMessage: string;
  setValue: (value: number) => void;
  // staticValueRef: MutableRefObject< number | null>;
};
export const Counter: React.FC<CounterPropsType> = (props) => {
  const { value, maxValue, error, preMessage, setValue } = props;

  const [incrDisabled, setIncrDisabled] = useState(false);
  const [resetDisabled, setResetDisabled] = useState(false);

  let showMessage: string | number;

  const isLocalSettedValue = localStorage.getItem("settedValue");

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

    if (value === maxValue) {
      setIncrDisabled(true);
    }
  }, [value, preMessage]);

  if (isLocalSettedValue !== null) {
    showMessage = value;
  } else if (preMessage) {
    showMessage = preMessage;
  } else {
    showMessage = error;
  }

  const onClickIncrHandler = () => {
    setValue(Number(value) + 1);
  };

  const onClickResetHandler = () => {
    // setValue(staticValueRef.current as number);

    const localSettedValue = localStorage.getItem("settedValue");

    localSettedValue && setValue(JSON.parse(localSettedValue));
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
