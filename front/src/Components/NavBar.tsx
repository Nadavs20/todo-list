import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1, mb: "5vh" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={() => window.open("https://puginarug.com/")}
            sx={{ mr: 2 }}
          >
            <PlaylistAddIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontFamily: "Courier New" }}
          >
            TODO LIST
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;