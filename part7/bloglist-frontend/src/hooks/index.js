import { useState } from "react";

export const useField = (type, name) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    props: { type, value, name, id: `input-${name}`, onChange },
    reset,
  };
};
