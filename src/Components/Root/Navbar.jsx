import { ChevronDown, ChevronRight, MenuIcon, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import SubNavbar from "./SubNavbar";
import NavbarResponsive from "./NavbarResponsive";
import logoonly from "../../assets/logoonly.png";
import { NavLink, useLocation, useParams } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const [navFixed, setNavFixed] = useState(true);

  useEffect(() => {
    // Set `navFixed` to true only if the current path is `/home`
    setNavFixed(location.pathname === "/");
  }, [location.pathname]); // Run this effect whenever the path changes

  const [menuToggle, setMenuToggle] = useState(false);
  const [socialsDrop, setSocialsDrop] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // Determine scroll direction

      setIsScrolled(scrollTop > 0); // Check if the page is scrolled
      setLastScrollTop(scrollTop); // Update last scroll position
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <div
      className={`navbar  ${
        navFixed ? " fixed " : "fixed md:relative"
      } w-full z-50 shadow-lg transition-transform duration-300
        `}
    >
      <div
        className={`px-1 lg:px-20  flex justify-between items-center text-gray-500 w-full ${
          isScrolled && navFixed
            ? "md:h-14 bg-gray-200 md:py-8 h-20 py-12"
            : "h-20 bg-gray-100 py-12 "
        } transition-all duration-300 `}
      >
        {/* LOGO BOX */}
        <div className="py-20">
          <NavLink to="/">
            <img
              src={logoonly}
              className={`${
                isScrolled && navFixed ? "h-20 md:h-12" : "h-16"
              } transition-all duration-300`}
              alt="LOGO"
            />
          </NavLink>
        </div>

        {/* MENU */}
        <div
          onClick={() => {
            setMenuToggle(!menuToggle);
          }}
          className="md:hidden"
        >
          {menuToggle ? <X size={24} /> : <MenuIcon size={24} />}
        </div>

        {/* MENU LIST */}
        <div className="menu-bar hidden md:block">
          <ul className="flex gap-5">
            <NavLink className="nav-link" to="/">
              <li className="cursor-pointer transition-all ease-in duration-300">
                Home
              </li>
            </NavLink>
            <NavLink className="nav-link" to="/about">
              <li className="cursor-pointer transition-all ease-in duration-300">
                About
              </li>
            </NavLink>

            <NavLink className="nav-link" to="/contact">
              <li className="cursor-pointer transition-all ease-in duration-300">
                Contact
              </li>
            </NavLink>

            <NavLink className="nav-link" to="/gallery">
              <li className="cursor-pointer transition-all ease-in duration-300">
                Author
              </li>
            </NavLink>

            <NavLink className="nav-link" to="/admission/inquiry">
              <li className="cursor-pointer transition-all ease-in duration-300">
                Features
              </li>
            </NavLink>

            <NavLink className="nav-link" to="/visit-form">
              <li className="cursor-pointer transition-all ease-in duration-300">
                Git Force
              </li>
            </NavLink>
          </ul>
        </div>

        <NavLink to={`/user-selection`}>
          {/* BUTTON */}
          <div className="hidden md:flex items-center bg-[#3a563f] text-white px-4 py-3 rounded-full font-semibold">
            Get Started <ChevronRight size={20} />
          </div>
        </NavLink>
      </div>

      <div
        className={`${menuToggle ? "" : "hidden"} md:${
          isScrolled && navFixed ? "hidden" : ""
        } md:block`}
      >
        <SubNavbar setMenuToggle={setMenuToggle} menuToggle={menuToggle} />
      </div>
      <div className={`${menuToggle ? "" : "hidden"} md:hidden`}>
        <NavbarResponsive
          setMenuToggle={setMenuToggle}
          menuToggle={menuToggle}
        />
      </div>
    </div>
  );
};

export default Navbar;
