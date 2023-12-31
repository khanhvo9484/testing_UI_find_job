import React from "react";
import Navbar from "../components/ui/navbar/Navbar.jsx";
import Footer from "../components/ui/Footer";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
    minHeight: "98vh",
  },
}));

const DefaultLayout = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.toolbar}> </div>
      <main className={classes.content}>{props.children}</main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
