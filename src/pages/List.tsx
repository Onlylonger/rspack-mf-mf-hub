import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useGlobal } from "../components/main-layout/global";
import { useTabs } from "../components/tabs/store";
import { useMenus } from "../components/aside/store";
import { cachedRoute } from "../components/main-layout/route-cache";

const infoMap = {
  "plugin-a": {
    label: "plugin-a",
    icon: "",
    hosps: [
      {
        label: "module-a",
        icon: "",
        id: "module-a",
      },
      {
        label: "module-b",
        icon: "",
        id: "module-b",
      },
    ],
  },
  "plugin-b": {
    label: "plugin-b",
    icon: "",
    hosps: [
      {
        label: "module-a",
        icon: "",
        id: "module-a",
      },
      {
        label: "module-b",
        icon: "",
        id: "module-b",
      },
    ],
  },
};

type InfoMap = typeof infoMap;
type LabsKey = keyof InfoMap;
type LabsItem = { label: string; icon: React.ReactNode; id: LabsKey };

export const ListPage = () => {
  const [selectedLab, setSelectedLab] = useState<LabsKey | null>(null);
  const [labs, setLabs] = useState<LabsItem[]>([]);
  const [hosps, setHosps] = useState<InfoMap[LabsKey]["hosps"]>([]);

  const nav = useNavigate();
  const val = useGlobal();

  useEffect(() => {
    new Promise<LabsItem[]>((re) => {
      setTimeout(() => {
        re(
          (Object.keys(infoMap) as LabsKey[]).map((v) => {
            return {
              label: infoMap[v].label,
              icon: infoMap[v].icon,
              id: v,
            };
          })
        );
      }, 500);
    }).then((res) => {
      setLabs(res);
      setHosps([]);
    });
  }, []);

  return (
    <Box sx={{}}>
      <Typography
        variant="h2"
        gutterBottom
        fontWeight={600}
        fontSize={24}
        textAlign="center"
      >
        Welcome {val?.userName} - {val?.userId} - {val?.roles}!
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {labs.map((v) => (
          <Button
            variant="outlined"
            key={v.id}
            onClick={() => {
              setSelectedLab(v.id);
              setHosps(infoMap[v.id].hosps);
            }}
            sx={{
              borderRadius: "50%",
              width: "100px",
              height: "100px",
            }}
          >
            {v.label}
          </Button>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        {hosps.map((v) => (
          <Button
            key={v.id}
            variant="outlined"
            onClick={() => {
              useTabs.getState().reset();
              useMenus.getState().reset();
              cachedRoute.clear();
              nav(`/new/${selectedLab}/${v.id}`);
            }}
          >
            {selectedLab ? `${selectedLab}-` : ""}
            {v.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
