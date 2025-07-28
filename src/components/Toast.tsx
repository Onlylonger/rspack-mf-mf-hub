import { Snackbar } from "@mui/material";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

export const ToastContext = createContext<{
  open: (msg: string) => void;
} | null>(null);

export const ToastProvider = (props: PropsWithChildren<{}>) => {
  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState("");

  const open = useCallback((msg: string) => {
    setVisible(true);
    setMsg(msg);
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  const value = useMemo(
    () => ({
      open,
    }),
    [open]
  );

  return (
    <ToastContext.Provider value={value}>
      {props.children}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={visible}
        onClose={handleClose}
        message={msg}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const val = useContext(ToastContext);
  if (!val) {
    throw new Error("useToast need to used in ToastProvider");
  }
  return val;
};
