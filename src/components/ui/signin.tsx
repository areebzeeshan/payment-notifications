/* eslint-disable no-extra-boolean-cast */
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  loginInWithEmailAndPassword,
  loginWithGoogle,
  sendPasswordReset,
} from "../../firebase/firebase";
import { MySwal, toast } from "../utils/swal";
import GoogleIcon from "../../assets/google.svg";
import Copyright from "../utils/Copyright";
import { createRef, useState } from "react";
import {
  Card,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { grayColor } from "../utils/color";

const defaultTheme = createTheme();

export default function SignInSide() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const passwordRef = createRef<HTMLInputElement>();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = passwordRef.current.value;

    try {
      const res = await loginInWithEmailAndPassword(email, password);

      if (res?.token) {
        toast
          .fire({
            icon: "success",
            title: "Login Successful!",
            timer: 1500,
            timerProgressBar: true,
          })
          .then(() => {
            navigate("/dashboard");
          });
      } else {
        toast.fire({
          icon: "error",
          text: "Invalid credentials. Please try again.",
          timer: 3000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Login Error:", error);
      MySwal.fire({
        icon: "error",
        title: "Login Failed",
        text: "An error occurred during login. Please try again later.",
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      if (loginWithGoogle) {
        toast.fire({ icon: "success", text: "Logged In successfully" });
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        display={"flex"}
        justifyContent={"center"}
        alignItems={'center'}
        sx={{ height: "100vh" }}
      >
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          elevation={3}
          borderRadius={'2rem'}
          square
          component={Card} // Add this line to fix the error
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" fontWeight={"bold"} variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="password">Password *</InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  inputRef={passwordRef}
                  required
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                ></OutlinedInput>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 1,
                  backgroundColor: grayColor,
                  "&:hover": {
                    backgroundColor: grayColor,
                  },
                }}
              >
                Sign In
              </Button>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Box sx={{ flexGrow: 1, height: 1, bgcolor: "divider" }} />
                <Box sx={{ mx: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    or continue with
                  </Typography>
                </Box>
                <Box sx={{ flexGrow: 1, height: 1, bgcolor: "divider" }} />
              </Box>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  mb: 2,
                  backgroundColor: grayColor,
                  "&:hover": {
                    backgroundColor: grayColor,
                  },
                }}
                onClick={handleGoogleLogin}
                startIcon={
                  <img
                    src={GoogleIcon}
                    alt="icon"
                    style={{ width: 24, height: 24 }}
                  />
                }
              >
                Google
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
