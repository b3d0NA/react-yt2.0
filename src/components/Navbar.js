import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import React, { useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import { useGlobalContext } from "../api/context";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    color: "#000",
    width: "20vw",
    [theme.breakpoints.up("md")]: {
      width: "20vw",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function Navbar() {
  const searchRef = useRef("");
  const { setSearchTerm } = useGlobalContext();
  const handleOnchange = () => {
    const newSearch = searchRef.current.children[0].value;
    <Redirect push to="/" />;
    if (newSearch === "") {
      setSearchTerm("Islam");
    } else {
      setSearchTerm(newSearch);
    }
  };
  const classes = useStyles();
  return (
    <div className={classes.grow}>
      <AppBar
        position="static"
        style={{
          marginTop: "-7px",
          marginBottom: "50px",
          background: "#fff",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          ></IconButton>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              className={classes.title}
              variant="h6"
              noWrap
              style={{ display: "flex", color: "#333" }}
            >
              <img
                src="https://www.youtube.com/s/desktop/3ce082d6/img/favicon_32.png"
                alt="YouTube 2.0"
              />{" "}
              YouTube 2.0
            </Typography>
          </Link>
          <div className={classes.search} style={{ margin: "auto" }}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              ref={searchRef}
              onChange={handleOnchange}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
