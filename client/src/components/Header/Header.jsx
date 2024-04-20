import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from "react-router-dom";
const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const toggleMenu = () => {
    setMenuOpened(!menuOpened);
  };

  const getMenuStyle = (menuOpened) => {
    if (document.documentElement.clientWidth < 768) {
      return {
        right: !menuOpened && "-100%",
      };
    }
  };
  return (
    <section className="h-wrapper">
      <div className="h-container flexCenter paddings innerWidth">
        {/* logo */}
        <Link to="/">
          <img src="./logo.png" width={100} alt="logo" />
        </Link>

        {/* menu */}
        <OutsideClickHandler onOutsideClick={() => setMenuOpened(false)}>
          <div className="h-menu flexCenter" style={getMenuStyle(menuOpened)}>
            <NavLink to="/properties">Properties</NavLink>
            <a href="mailto:gamandeepsingh4gmail.com">Contact</a>

            {/* login Button */}
            <button className="button">Login</button>
          </div>
        </OutsideClickHandler>

        {/* Medium screen and small screen */}
        <div className="menu-icon" onClick={toggleMenu}>
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
