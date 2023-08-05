import { useEffect, useState } from "react";

export const useLocalValue = (localString: string, defaultValue: number) => {
  const [value, setValue] = useState(() => {
    const isLocalValue = localStorage.getItem(localString);
    return isLocalValue !== null ? JSON.parse(isLocalValue) : defaultValue;
  });



  return [value, setValue];
};
