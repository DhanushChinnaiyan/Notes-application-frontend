import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Sidebar from "./sidebar/sidebar";
import { useCommonContext } from "./ContextApi/context";
import './Base.css'

// MUI functions
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Base = ({ children }) => {
    const { commonStates,toggleSideBar,getSearchedNotesTitle } = useCommonContext();
    const className = commonStates.sideBarClicked ?  "children childrenWithSideBar" : "children" ;
    const handleSearch = (event) => {
        if (event.key === "Enter") {
            const value = event.target.value
            if(value){
                getSearchedNotesTitle(value)
            }
        }
    };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{ backgroundColor: "rgb(93, 23, 121)", height: "60px" }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={toggleSideBar}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              NOTE EASE
            </Typography>
            <Search >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
              onKeyDown={handleSearch}
              
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>

      {/* side bar */}
      <Sidebar />
      {/* Children */}
      <div className={className}>{children}</div>
    </>
  );
};

export default Base;
