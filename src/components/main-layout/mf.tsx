import { createContext, useContext, type PropsWithChildren } from "react";

export interface MFInfo {
  plugin: any;
}

export const mfContext = createContext<MFInfo | null>(null);

export const MFProvider = (
  props: PropsWithChildren<{ val: MFInfo | null }>
) => {
  const { val, children } = props;

  return <mfContext.Provider value={val}>{children}</mfContext.Provider>;
};

export const useMF = () => {
  const val = useContext(mfContext);
  if (!val) {
    throw new Error("useMF only used in MFProvider");
  }

  return val;
};
