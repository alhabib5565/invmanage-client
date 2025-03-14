import { useEffect, useState } from "react";

const useDebounce = ({ value }: { value: string }) => {
  const [debounce, setDebounce] = useState("");

  useEffect(() => {
    const handleDebounce = setInterval(() => {
      setDebounce(value);
    }, 500);
    return () => {
      clearInterval(handleDebounce);
    };
  }, [value]);

  return debounce;
};

export default useDebounce;
