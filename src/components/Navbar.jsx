import React from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebaseConfig";
import useStyles from "../styles/styles";

const Navbar = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  const handleAboutUs = () => {
    navigate("/AboutUs");
  };

  return (
    <AppBar position="static" className={classes.navbar} >
      <Toolbar>
        <Typography variant="h6" className={classes.navbarTitle}>
          CIARO
        </Typography>
        <Box>
          <Button
            className={classes.navbarButton}
            color="inherit"
            onClick={handleAboutUs}
          >
            About Us
          </Button>
          <Button
            className={classes.navbarButton}
            color="inherit"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
