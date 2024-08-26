/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  registerWithEmailAndPassword,
  auth,
  loginWithGoogle,
} from "../../firebase/firebase";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { MySwal, toast } from "../utils/swal";
import GoogleIcon from "../../assets/google.svg";
import Copyright from "../utils/Copyright";
import { Card, Paper } from "@mui/material";
import { grayColor } from "../utils/color";

const defaultTheme = createTheme();
export default function SignUp() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) {
      MySwal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "You can now sign in with your credentials.",
        timer: 3000,
        timerProgressBar: true,
      }).then(() => {
        navigate("/signin");
      });
    }
    if (error) {
      MySwal.fire({
        icon: "error",
        title: "Registration Failed!",
        text: "An error occurred while registering. Please try again later.",
      });
      console.error("Registration Error: ", error);
    }
  }, [loading, user, error, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    try {
      await registerWithEmailAndPassword(name, email, password);
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Registration Failed!",
        text: "An error occurred while registering. Please try again later.",
      });
      console.error(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      if (loginWithGoogle) {
        toast.fire({ icon: "success", text: "Registered Successfully" });
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
        alignItems={"center"}
        sx={{ height: "100vh" }}
      >
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          elevation={3}
          borderRadius={"2rem"}
          square
          component={Card}
          padding={"2rem"}
        >
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography component="h1" fontWeight={"bold"} variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>

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
                Sign Up
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
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
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
