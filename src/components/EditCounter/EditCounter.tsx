import React, { ChangeEvent, useEffect, useState } from "react";

import s from "./EditCounter.module.css";
import Button from "../Button/Button";

type EditCounterPropsType = {
  maxValue: number;
  error: string;
  value: number;
  setValue: (value: number) => void;
  setMaxValue: (maxValue: number) => void;
  setError: (error: string) => void;
  setPreMessage: (preMessage: string) => void;
};

export const EditCounter: React.FC<EditCounterPropsType> = (props) => {
  const {
    maxValue,
    error,
    value,
    setValue,
    setMaxValue,
    setError,
    setPreMessage,
  } = props;

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (value < 0 || maxValue <= 0 || value > maxValue || value === maxValue) {
      setError("Incorrect Value");
      setPreMessage("");
    }
  }, [value, maxValue]);

  const onChangeItemHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value);
    const name = e.currentTarget.name;

    setError("");
    setPreMessage('Enter and press "set"');
    localStorage.removeItem("staticValue");
    setDisabled(false);

    switch (name) {
      case "maxValue": {
        setMaxValue(value);
        break;
      }
      case "value": {
        setValue(value);
        break;
      }
    }
  };

  const onClickButtonHandler = () => {
    localStorage.setItem("staticValue", JSON.stringify(value));

    setPreMessage("");
    setDisabled(true);
  };

  return (
    <div className={s.wrapperEditCounter}>
      <div className={s.wrapperLabel}>
        <label className={s.label}>
          max Value
          <input
            type="number"
            name={"maxValue"}
            value={maxValue}
            onChange={onChangeItemHandler}
          />
        </label>

        <label className={s.label}>
          current Value
          <input
            type="number"
            name={"value"}
            value={value}
            onChange={onChangeItemHandler}
          />
        </label>
      </div>

      <div className={s.wrapperSet}>
        <Button
          title={"set"}
          disabled={Boolean(error) || disabled}
          callBack={onClickButtonHandler}
        />
      </div>
    </div>
  );
};
