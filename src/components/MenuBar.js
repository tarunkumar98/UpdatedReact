import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { signOutStart, signOutSuccess } from "../redux/user/user.actions";
import { selectCurrentUser } from "../redux/user/user.selector";
import { togglePostcartHidden } from "../redux/postcart/postcart.actions";

const MenuBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const logout = () => {
    dispatch(signOutStart());
    history.push("/");
    setActiveItem("home");
  };

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name={user.username} as={Link} to="/" />
      <Menu.Menu position="right">
        <Menu.Item name="Saved Post" onClick={()=>dispatch(togglePostcartHidden())}/>
        <Menu.Item name="logout" onClick={logout} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  );
  return menuBar;
};

export default MenuBar;
