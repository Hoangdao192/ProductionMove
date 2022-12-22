import React, { useState, createContext } from "react";

export const DarshboardContext = createContext();
const DarshboardProvider = (props) => {
  const [togleBar, setTogleBar] = useState(0);
  const [togleSider, setTogleSider] = useState(true);

  return (
    <DarshboardContext.Provider
      value={{
        togleSider: togleSider,
        setTogleSider: setTogleSider,
        togleBar: togleBar,
        setTogleBar: setTogleBar,
      }}
    >
      {props.children}
    </DarshboardContext.Provider>
  );
};

export default DarshboardProvider;
