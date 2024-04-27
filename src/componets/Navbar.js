import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { Icon } from "react-icons-kit";
import { cart } from "react-icons-kit/entypo/cart";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../componets/firebase";
import Button from "@mui/material/Button";

import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { red } from "@mui/material/colors";
import { NavLink } from "react-router-dom";

const pages = ["Products", "Pricing", "Blog"];

function Navbar({ user, totalQty }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  // handle logout
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/login");
    });
  };
  return (
    <AppBar position="static" style={{ backgroundColor: red[600] }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Order By Jar
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            OBJ
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <div className="flex items-center">
                <Link to="/" className="navlink mr-4">
                  {user}
                </Link>
                <Link to="/cart" className="navlink mr-4">
                  <Icon icon={cart} size={20} className="h-6 w-6" />
                  <span
                    style={{
                      width: "18px",
                      backgroundColor: "black",
                      padding: "3px",
                      borderRadius: "3px",
                      color: "white",
                      fontSize: "11px",
                      fontWeight: "600",
                      position: "absolute",
                      top: "2px",
                      right: "65px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {totalQty}
                  </span>
                </Link>

                <button className="logout-btn ml-4" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <Button style={{ color: "white" }}>
                  <NavLink to="/login">Login</NavLink>
                </Button>
                <Button style={{ color: "white" }}>
                  {" "}
                  <NavLink to="/signin">Sign In</NavLink>
                </Button>
              </div>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
