import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";
import { useRef, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { login } from "../utils/api";
import { useToast } from "../components/Toast";
import { useNavigate } from "react-router";

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const [loading, setLoading] = useState(false);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const pwdRef = useRef<HTMLInputElement | null>(null);

  const { open } = useToast();
  const nav = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    if (!usernameRef.current?.value) {
      setUsernameError(true);
      return;
    }
    if (!pwdRef.current?.value) {
      setPwdError(true);
      return;
    }

    try {
      setLoading(true);

      const res = await login<{ token: string; refreshToken: string }>({
        userName: usernameRef.current.value,
        password: pwdRef.current.value,
      });
      localStorage.setItem("token", res.data.token);
      nav("/");
    } catch (error: any) {
      open(
        error?.msg ?? error?.statusText ?? error?.message ?? "Internal Error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleKeyDown: React.KeyboardEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLDivElement
  > = (e) => {
    if (e.code === "Enter") {
      handleLogin();
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          minWidth: 400,
          minHeight: 300,
          padding: "32px",
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          fontWeight={600}
          fontSize={24}
          textAlign="center"
        >
          Sign in
        </Typography>
        <Typography
          variant="body2"
          color="var(--mui-palette-text-secondary)"
          textAlign="center"
        >
          Welcome user, please sign in to continue
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "80%",
            margin: "32px auto 0 auto",
          }}
        >
          <TextField
            required
            label="Username"
            autoFocus
            placeholder="admin"
            inputRef={usernameRef}
            error={usernameError}
            helperText={usernameError && "Cannot be empty"}
            onChange={() => usernameError && setUsernameError(false)}
            onKeyDown={handleKeyDown}
          />
          <FormControl sx={{}} variant="outlined" required error={pwdError}>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              placeholder="123456"
              onKeyDown={handleKeyDown}
              inputRef={pwdRef}
              type={showPassword ? "text" : "password"}
              onChange={() => pwdError && setPwdError(false)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            {pwdError && <FormHelperText>Cannot be empty</FormHelperText>}
          </FormControl>

          <Typography variant="body2" color="#d1d5db">
            Eg: admin 123456
          </Typography>
          <Button
            variant="contained"
            fullWidth
            size="medium"
            onClick={handleLogin}
            loading={loading}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
