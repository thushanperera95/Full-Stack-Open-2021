import { useState } from "react";

export const useVisibility = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return {
    visible,
    toggleVisibility,
  };
};
