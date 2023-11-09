import {
  AppBar,
  Grid,
  Box,
  Toolbar,
  Typography,
  Container,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";

import { Login, Straight } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useAuth from "../../../hooks/useAuth";
import UserMenu from "./UserMenu";
import SearchBar from "./SearchBar";
import useProgressiveImage from "../../../hooks/useProgressiveImage";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/football1.png";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    padding: "0!important",
  },
  searchField: {
    borderRadius: "80px",
    backgroundColor: "white",
    minWidth: "300px!important",
    marginLeft: "auto!important",
    marginRight: "auto!important",
  },
  activeLink: {
    color: theme.palette.blueBackground.activeLink,
  },
  inActiveLink: {
    color: "white",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  functionLink: {
    display: "flex",
    alignItems: "center",
    userSelect: "none",
    "&:hover": {
      textDecoration: "underline",
    },
    cursor: "pointer",
    color: "white",
    textDecoration: "none",
  },
}));

const Navbar = ({ drawerWidth }) => {
  const navigate = useNavigate();
  const authContext = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (authContext?.auth?.username) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [authContext]);
  const theme = useTheme();
  const classes = useStyles();
  const loadedLogo = useProgressiveImage(logo);

  return (
    <header>
      <AppBar
        sx={{
          width: drawerWidth ? `calc(100% - ${drawerWidth}px)` : "100%",
          zIndex: (theme) => {
            return theme.zIndex.drawer + 1;
          },
        }}
        position="fixed"
        className={classes.root}
      >
        <Toolbar sx={{ userSelect: "none" }}>
          <Box
            sx={{
              visibility: loadedLogo ? "visible" : "hidden",
              display: "flex",
              width: "100%",
              userSelect: "none",
              alignItems: "center",
            }}
          >
            <Box
              style={{ minWidth: "6rem" }}
              onClick={() => {
                navigate("/", { replace: true });
              }}
            >
              <img
                className="navbar-logo"
                src={loadedLogo}
                style={{
                  height: "50px",
                  margin: "10px",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              />
            </Box>
            <Box sx={{ display: "flex", marginLeft: "auto" }}>
              <Typography variant="h6" sx={{ margin: "1rem" }}>
                <NavLink
                  to="/schedule"
                  className={(navData) =>
                    navData.isActive ? classes.activeLink : classes.inActiveLink
                  }
                ></NavLink>
              </Typography>
            </Box>
            <SearchBar />
            <Box
              sx={{
                minWidth: "6rem",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              {!isLogin && (
                <>
                  <Link to="/login">
                    <Typography variant="h6" className={classes.functionLink}>
                      <Login sx={{ margin: "5px" }} />
                      Đăng nhập
                    </Typography>
                  </Link>
                  <Link to="/login">
                    <Typography variant="h6" className={classes.functionLink}>
                      <Straight sx={{ margin: "5px 0px 5px 5px" }} />
                      Đăng ký
                    </Typography>
                  </Link>
                </>
              )}

              {isLogin && <UserMenu />}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Navbar;
