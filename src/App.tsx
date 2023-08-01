import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { EditCounter } from "./components/EditCounter/EditCounter";
import { Counter } from "./components/Counter/Counter";

function App() {
  const [value, setValue] = useState(() => {
    const isSettedValue = localStorage.getItem("settedValue");
    return isSettedValue !== null ? JSON.parse(isSettedValue) : 0;
  });

  const [maxValue, setMaxValue] = useState(() => {
    const localMaxValue = localStorage.getItem("maxValue");

    return localMaxValue !== null ? JSON.parse(localMaxValue) : 1;
  });

  const [error, setError] = useState("");

  localStorage.setItem("maxValue", JSON.stringify(maxValue));

  const [preMessage, setPreMessage] = useState('Enter and press "set"');

  // const localIsSettedValue = localStorage.getItem("settedValue");
  //
  // const staticValueRef = useRef<number>(
  //   localIsSettedValue !== null ? JSON.parse(localIsSettedValue) : 0
  // );

  return (
    <div className="App">
      <EditCounter
        maxValue={maxValue}
        error={error}
        setValue={setValue}
        setMaxValue={setMaxValue}
        setError={setError}
        setPreMessage={setPreMessage}
        // staticValueRef={staticValueRef}
      />
      <Counter
        value={value}
        maxValue={maxValue}
        error={error}
        preMessage={preMessage}
        setValue={setValue}
        // staticValueRef={staticValueRef}
      />
    </div>
  );
}

export default App;
