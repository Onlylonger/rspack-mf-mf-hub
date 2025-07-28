import React, { type PropsWithChildren } from "react";

export const Activity = (
  props: PropsWithChildren<{ mode: "visible" | "hidden" }>
) => {
  const { mode, ...reset } = props;

  const Comp = Reflect.get(React, "unstable_Activity");

  if (Comp) {
    return <Comp {...props} />;
  }

  return (
    <div
      style={{
        display: mode === "visible" ? "block" : "none",
      }}
      {...reset}
    />
  );
};
