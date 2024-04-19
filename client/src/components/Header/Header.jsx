import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler"
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
  }
  return (
    <section className="h-wrapper">
      <div className="h-container flexCenter paddings innerWidth">
        <img src="./logo.png" width={100} alt="logo" />

        <OutsideClickHandler onOutsideClick={() => setMenuOpened(false)}>
        <div className="h-menu flexCenter"
        style={getMenuStyle(menuOpened)}
        >
          <a href="">Residencies</a>
          <a href="">Our Value</a>
          <a href="">Contact Us</a>
          <a href="">Get Startd</a>
          <button className="button">
            <a href="">Contact</a>
          </button>
        </div>
        </OutsideClickHandler>
        <div className="menu-icon" onClick={toggleMenu}>
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
