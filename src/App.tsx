import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { EditCounter } from "./components/EditCounter/EditCounter";
import { Counter } from "./components/Counter/Counter";
import { useLocalValue } from "./useLocalValue/useLocalValue";

function App() {
  const [value, setValue] = useLocalValue("value", 0);

  localStorage.setItem("value", JSON.stringify(value));

  const [maxValue, setMaxValue] = useLocalValue("maxValue", 1);

  localStorage.setItem("maxValue", JSON.stringify(maxValue));

  const [preMessage, setPreMessage] = useState('Enter and press "set"');

  const [error, setError] = useState("");

  return (
    <div className="App">
      <EditCounter
        maxValue={maxValue}
        error={error}
        value={value}
        setValue={setValue}
        setMaxValue={setMaxValue}
        setError={setError}
        setPreMessage={setPreMessage}
      />
      <Counter maxValue={maxValue} error={error} preMessage={preMessage} />
    </div>
  );
}

export default App;
