import { createContext, useContext, type PropsWithChildren } from "react";

export interface GlobalInfo {
  userName: string;
  userId: string;
  roles: string[];
}

export const globalContext = createContext<GlobalInfo | null>(null);

export const GlobalProvider = (
  props: PropsWithChildren<{ val: GlobalInfo | null }>
) => {
  const { val, children } = props;

  return (
    <globalContext.Provider value={val}>{children}</globalContext.Provider>
  );
};

export const useGlobal = () => {
  const val = useContext(globalContext);
  //   if (!val) {
  //     throw new Error("useGlobal only used in GLobalProvider");
  //   }

  return val;
};
