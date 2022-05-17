import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";

import { Button, Typography } from "@material-ui/core";

import Navbar from "@material-tailwind/react/Navbar";
import NavbarContainer from "@material-tailwind/react/NavbarContainer";
import NavbarWrapper from "@material-tailwind/react/NavbarWrapper";
import NavbarBrand from "@material-tailwind/react/NavbarBrand";
import NavbarToggler from "@material-tailwind/react/NavbarToggler";
import NavbarCollapse from "@material-tailwind/react/NavbarCollapse";
import Nav from "@material-tailwind/react/Nav";
import NavLink from "@material-tailwind/react/NavLink";

import useUa from "@/utils/ua.js";
import LanButton from "@/components/lan-button.js";
import { cdnServer } from "@/config";
import dbL from "@/dbL.js";
import t from "@/components/t.js";

const Layout = ({ children, contentClass, rootClass }) => {
  const [openNavbar, setOpenNavbar] = useState(false);
  const ua = useUa();
  const location = useLocation();
  const resetNur = () => {
    dbL
      .set("selected", {
        supports: { 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {} },
        player: {},
        races: [],
      })
      .write();
  };
  const pcList = [
    { path: "/", title: "角色" },
    { path: "/support", title: "支援" },
    { path: "/skill", title: "技能" },
    { path: "/race", title: "比賽" },
    { path: "/nurturing", title: "育成" },
    { path: "/seed", title: "種馬" },
  ];
  const phoneList = [
    { path: "/", title: "角色" },
    { path: "/support", title: "支援" },
    { path: "/skill", title: "技能" },
    { path: "/race", title: "比賽" },
    { path: "/nurturingMo", title: "育成" },
    { path: "/seedMo", title: "種馬" },
  ];
  const list = ua.isPhone ? phoneList : pcList;
  return (
    <div className={"flex flex-col w-screen min-h-screen relative"}>
      <Navbar className="sticky top-0 z-50" color="lightBlue" navbar>
        <NavbarContainer>
          <NavbarWrapper>
            <NavbarBrand>賽馬娘</NavbarBrand>
            <NavbarToggler
              color="white"
              onClick={() => setOpenNavbar(!openNavbar)}
              ripple="light"
            />
          </NavbarWrapper>

          <NavbarCollapse open={openNavbar}>
            <Nav leftSide>
              {list.map((item) => (
                <Link to={item.path} onClick={() => setOpenNavbar(!openNavbar)}>
                  <NavLink
                    // href={item.path}
                    active={location.pathname === item.path && "light"}
                    ripple="light"
                  >
                    <Typography>{t(item.title)}</Typography>
                  </NavLink>
                </Link>
              ))}
            </Nav>
          </NavbarCollapse>
        </NavbarContainer>
      </Navbar>
      {children}
      <div className="w-full flex items-center flex-wrap pb-10 md:pb-0">
        <Button className="cursor-pointer" data-tip="无法打开育成页面时点一哈" onClick={resetNur} variant="contained" >
          {t("初始化育成")}
        </Button>
        <LanButton />
        <div className="flex-auto" />
      </div>
    </div>
  );
};
export default Layout;
