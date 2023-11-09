import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import DefaultLayout from "../../../layout/DefaultLayout";
import { Backdrop, LinearProgress } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import MyAxios from "../../../api/MyAxios";
import { Label } from "@mui/icons-material";
import { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/CheckCircleOutlined";
import ErrorIcon from "@mui/icons-material/ErrorOutlineOutlined";
import Loader from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import AlreadyLogin from "./AlreadyLogin";

export default function Login() {
  const navigate = useNavigate();

  const { auth, updateAuth, handleStorageOptionChange } = useAuth();
  const [notify, setNotify] = useState({ message: "", status: null });
  const [loading, setLoading] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  let usernameRef = useRef(null);
  let passwordRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);

    usernameRef.current = data.get("username");
    passwordRef.current = data.get("password");
    let username = usernameRef.current;
    let password = passwordRef.current;
    let isRemember = data.get("remember");

    try {
      const response = await MyAxios.post(
        "/auth/signin",
        JSON.stringify({
          email: username,
          password: password,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = response?.data?.data;
      const accessToken = data.accessToken;
      const email = data?.email;
      const name = data?.name;
      const role = data?.role;
      const token = { accessToken, status: "OK" };
      const dob = data?.ngaySinh;
      const image = data?.hinhAnh;
      const teamId = data?.id_doibong;
      const id = data?.id_quanly;

      let storageOption = "cookieStorage";
      if (isRemember === "remember") {
        storageOption = "localStorage";
      } else {
        storageOption = "cookieStorage";
      }
      handleStorageOptionChange(storageOption);
      updateAuth({
        username,
        password,
        token,
        email,
        image,
      });
      setNotify({ message: "Đăng nhập thành công", status: "success" });
      setIsFirstLogin(true);
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);
    } catch (error) {
      if (!error.response) {
        setNotify({ message: "Lỗi mạng", status: "error" });
      } else if (error.response.status === 401) {
        setNotify({
          message: "Sai tên đăng nhập hoặc mật khẩu",
          status: "error",
        });
      } else if (error.response.status === 500) {
        setNotify({
          message: "Lỗi máy chủ",
          status: "error",
        });
      } else if (error.response.status === 403) {
        setNotify({
          message: "Tài khoản của bạn đã bị khóa",
          status: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      {(!auth?.username || isFirstLogin) && (
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Đăng nhập
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Tên đăng nhập"
                name="username"
                autoComplete="username"
                ref={usernameRef}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                ref={passwordRef}
                autoComplete="current-password"
              />
              <FormControlLabel
                name="remember"
                control={<Checkbox value="remember" color="primary" />}
                label="Ghi nhớ đăng nhập"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Đăng nhập
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Quên mật khẩu?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Chưa có tài khoản? Đăng ký ngay"}
                  </Link>
                </Grid>
              </Grid>

              <Box
                sx={{
                  mt: "1rem",
                  bgcolor:
                    notify.status === "error"
                      ? "error.light"
                      : notify.status === "success"
                      ? "success.light"
                      : "inherit",
                  borderRadius: "4px",
                  opacity: 0.5,
                }}
              >
                <Box
                  sx={{
                    display: loading ? "flex" : "none",
                    justifyContent: "center",
                  }}
                >
                  <Loader sx={{ textAlign: "center" }}></Loader>
                </Box>
                <Typography
                  sx={{
                    display: loading ? "none" : "flex",
                    padding: "0.5rem",
                    alignItems: "center",
                    alignContent: "center",
                    color:
                      notify.status === "error"
                        ? "error.main"
                        : notify.status === "success"
                        ? "success.main"
                        : "inherit",
                    fontWeight: "550",
                  }}
                  variant="h6"
                >
                  {notify.status === "error" ? (
                    <ErrorIcon sx={{ mr: "1rem" }}></ErrorIcon>
                  ) : null}
                  {notify.status === "success" ? (
                    <CheckIcon sx={{ mr: "1rem" }}></CheckIcon>
                  ) : null}
                  {notify.message}
                </Typography>
                {notify.status === "success" ? (
                  <Box sx={{ width: "100%" }}>
                    <LinearProgress color="primary" />
                  </Box>
                ) : null}
              </Box>
            </Box>
          </Box>
        </Container>
      )}
      {auth?.username && !isFirstLogin && <AlreadyLogin />}
    </DefaultLayout>
  );
}
