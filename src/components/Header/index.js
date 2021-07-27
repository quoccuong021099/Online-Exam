import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import React, { useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { logoutUser } from "../../redux/actions/login";
import { makeSelectIsSuccessLogin } from "../../redux/selectors/login";
import Logo from "../Image/logo.png";
import "./style.scss";

function Header({ statusFlags, triggerLogout }) {
  const btnRef = useRef(null);

  // get item từ localStorage
  const data = JSON.parse(localStorage.getItem("user-info"));

  // hàm logout
  const logoutUser = () => {
    triggerLogout();
  };

  // material-ui
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      className="logout"
      anchorEl={anchorEl}
      open={isMenuOpen}
      onClose={handleMenuClose}
      style={{ top: "45px", left: "30px" }}
    >
      <MenuItem onClick={logoutUser}>
        <ExitToAppIcon /> Logout
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <header>
        <Box className="header">
          <Link to="/">
            <img src={Logo} alt="" className="header__logo" />
          </Link>

          <ul className="header__nav">
            <li className="header__nav-item active">
              <a href="/#" className="header__nav-link">
                THI THPTQG
              </a>
            </li>
            <li className="header__nav-item">
              <a href="/#" className="header__nav-link">
                ĐỀ THI KIỂM TRA
              </a>
            </li>
            <li className="header__nav-item">
              <a href="/#" className="header__nav-link">
                ENGLISH TEST
              </a>
            </li>
            <li className="header__nav-item">
              <a href="/#" className="header__nav-link">
                IT TEST
              </a>
            </li>
            <li className="header__nav-item">
              <a href="/#" className="header__nav-link">
                ĐẠI HỌC
              </a>
            </li>
            <li className="header__nav-item">
              <a href="/#" className="header__nav-link">
                HƯỚNG NGHIỆP
              </a>
            </li>
            <li className="header__nav-item">
              <a href="/#" className="header__nav-link">
                TÀI LIỆU
              </a>
            </li>
          </ul>
          <Box className="header__login">
            <Link to={data ? "#" : "/Login"}>
              <Toolbar>
                <IconButton
                  className="header__login-icon"
                  onClick={handleProfileMenuOpen}
                  ref={btnRef}
                >
                  <span className="header__login-name">
                    {statusFlags.isLoginSuccess
                      ? `Hi! ${data.lastname}`
                      : "Đăng nhập"}
                  </span>
                  <AccountCircle className="icon" />
                </IconButton>
                {data && renderMenu}
              </Toolbar>
            </Link>
          </Box>
        </Box>
      </header>
    </>
  );
}
const mapStateToProps = createStructuredSelector({
  statusFlags: makeSelectIsSuccessLogin(),
});
function mapDispatchToProps(dispatch) {
  return {
    triggerLogout: () => dispatch(logoutUser()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
