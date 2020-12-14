import { useState } from "react";

export const useForm = (initialState) => {
  const [userData, setUserData] = useState(initialState);
  return [
    userData,
    (e) => {
      setUserData((prevState) => ({
        ...prevState,
        [e.target ? e.target.name : "selectedFile"]: e.target
          ? e.target.value
          : e.base64,
      }));
    },
    setUserData,
  ];
};
