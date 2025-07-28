import { useParams } from "react-router";
import { useMF } from "../components/main-layout/mf";

export const HandlerPage = () => {
  const { dynamicRoute } = useParams();
  const mf = useMF();

  if (!mf?.plugin.current.has(dynamicRoute)) {
    return "Not found this route";
  }

  const { handler } = mf?.plugin.current.get(dynamicRoute);

  return handler();
};
