/** Example take from
 *  https://github.com/jeffjadulco/jeffjadulco.com/blob/master/src/hooks/useSafeLocalStorage.ts
 */
import { useState } from "react";

const useSafeLocalStorage = (key: string, initialValue?: string) => {
  const [valueProxy, setValueProxy] = useState<string>(() => {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: string) => {
    try {
      window.localStorage.setItem(key, value);
      setValueProxy(value);
    } catch {
      setValueProxy(value);
    }
  };

  return [valueProxy, setValue];
};

export default useSafeLocalStorage;
