import { Box, Grid, Typography } from "@mui/material";
import React from "react";

import { makeStyles } from "@mui/styles";
import { Facebook, Twitter, YouTube, Instagram } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

import logo from "../../assets/football1.png";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    padding: "0!important",
    marginTop: "20px",
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

const Footer = ({ drawerWidth }) => {
  const classes = useStyles();

  return (
    <Box
      sx={{ display: "flex", justifyContent: "flex-end" }}
      className={classes.root}
    >
      <footer
        style={{
          width: drawerWidth ? `calc(100% - ${drawerWidth}px)` : "100%",
          textAlign: "center",
          display: "flex",
        }}
      >
        <Grid
          container
          spacing={1}
          justifyContent="space-around"
          sx={{ margin: "20px 0px" }}
        >
          <Grid item xs={12} sm={6} lg={3}>
            <Box sx={{ textAlign: "left" }}>
              <img
                src={logo}
                style={{
                  height: "35px",
                  margin: "10px",
                }}
              />
              <Typography
                variant="body2"
                sx={{ color: "white", marginLeft: "10px" }}
              ></Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3} lg={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                color: "white",
              }}
            >
              <Typography variant="subtitle1" sx={{ margin: "0.4em" }}>
                <NavLink
                  to="/schedule"
                  className={(navData) =>
                    navData.isActive ? classes.activeLink : classes.inActiveLink
                  }
                ></NavLink>
              </Typography>
              <Typography variant="subtitle1" sx={{ margin: "0.4rem" }}>
                <NavLink
                  to="/standings"
                  className={(navData) =>
                    navData.isActive ? classes.activeLink : classes.inActiveLink
                  }
                ></NavLink>
              </Typography>
              <Typography variant="subtitle1" sx={{ margin: "0.4rem" }}>
                <NavLink
                  to="/clubs"
                  className={(navData) =>
                    navData.isActive ? classes.activeLink : classes.inActiveLink
                  }
                ></NavLink>
              </Typography>
              <Typography variant="subtitle1" sx={{ margin: "0.4rem" }}>
                <NavLink
                  to="/players"
                  className={(navData) =>
                    navData.isActive ? classes.activeLink : classes.inActiveLink
                  }
                ></NavLink>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3} lg={2}>
            <Box sx={{ marginBottom: "10px" }}>
              <Typography variant="subtitle1" sx={{ color: "white" }}>
                Follow us
              </Typography>
            </Box>
            <Box
              sx={{
                color: "white",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "flex-end",
              }}
            >
              <Box>
                <Facebook />
              </Box>
              <Box>
                <Twitter />
              </Box>
              <Box>
                <Instagram />
              </Box>
              <Box>
                <YouTube />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </footer>
    </Box>
  );
};

export default Footer;
