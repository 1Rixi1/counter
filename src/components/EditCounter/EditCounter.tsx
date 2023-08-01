import React, {
  ChangeEvent,
  MutableRefObject,
  useEffect,
  useState,
} from "react";

import s from "./EditCounter.module.css";
import Button from "../Button/Button";

type EditCounterPropsType = {
  maxValue: number;
  error: string;
  setValue: (value: number) => void;
  setMaxValue: (maxValue: number) => void;
  setError: (error: string) => void;
  // setPreMessage: (preMessage: { text: string }) => void;
  setPreMessage: (preMessage: string) => void;
  // staticValueRef: MutableRefObject<number | null>;
};

export const EditCounter: React.FC<EditCounterPropsType> = (props) => {
  const {
    maxValue,
    error,
    setValue,
    setMaxValue,
    setError,
    setPreMessage,
    // staticValueRef,
  } = props;

  const [currentValue, setCurrentValue] = useState(() => {
    const localValue = localStorage.getItem("value");

    return localValue !== null ? JSON.parse(localValue) : 0;
  });

  const [disabled, setDisabled] = useState(false);

  localStorage.setItem("value", JSON.stringify(currentValue));

  useEffect(() => {
    if (
      currentValue < 0 ||
      maxValue <= 0 ||
      currentValue > maxValue ||
      currentValue === maxValue
    ) {
      setError("Incorrect Value");
      setPreMessage("");
    }
  }, [currentValue, maxValue]);

  const onChangeItemHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value);
    const name = e.currentTarget.name;
    setError("");
    setPreMessage('Enter and press "set"');
    localStorage.removeItem("settedValue");
    setValue(1);

    setDisabled(false);
    switch (name) {
      case "maxValue": {
        setMaxValue(value);
        break;
      }
      case "currentValue": {
        setCurrentValue(value);
        break;
      }
    }
  };

  const onClickButtonHandler = () => {
    localStorage.setItem("settedValue", currentValue);
    // staticValueRef.current = currentValue;
    setValue(currentValue);
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
            name={"currentValue"}
            value={currentValue}
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
