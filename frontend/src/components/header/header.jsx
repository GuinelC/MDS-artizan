import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  NavbarItem,
  NavbarMenuItem,
  NavbarMenu,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useAuth } from "../../context/authContext.jsx";
import CounterCart from "../shop/CounterCart.jsx";
import { GiSwordsPower } from "react-icons/gi";
import { IoPower } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import "./Header.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    state: { isLoggedIn, user },
    logout,
  } = useAuth();

  return (
    <Navbar className="navbar" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="navbar-content">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link className="text-black" href="/">
            {/* <AcmeLogo /> */}
            <GiSwordsPower size={32} />

            <p
              className="font-bold text-inherit text-black"
              style={{ fontSize: "20px" }}
            >
              ARTIZANS
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link className=" text-black font-bold" href="/">
            Accueil
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className=" text-black font-bold" href="/artisans">
            Artisans
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className=" text-black font-bold" href="/about">
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className=" text-black font-bold" href="/services">
            Services
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className=" text-black font-bold" href="/contact">
            Contact
          </Link>
        </NavbarItem>
        <NavbarItem>
          {isLoggedIn && (
            <Link href="/cart">
              <CounterCart />
            </Link>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        {isLoggedIn ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=gvhgde9yfo7"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                key="profile"
                href="/profile"
                className="h-14 flex items-center"
              >
                {isLoggedIn && user ? (
                  <>
                    <div className="flex items-center">
                      <FaRegUser className="mr-2" />
                      <p className="font-semibold">Mon compte</p>
                    </div>
                  </>
                ) : (
                  <p className="font-semibold">Non connecté</p>
                )}
              </DropdownItem>

              <DropdownItem
                key="Dashboard"
                href="/Dashboard"
                className="h-14"
              >
                <div className="flex items-center">
                  <GoHome className="mr-2" />
                  Dashboard
                </div>
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onPress={logout}>
                <div className="flex items-center">
                  <IoPower className="mr-2" />
                  Se déconnecter
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Button
            as={Link}
            color="primary"
            href="/authentication"
            variant="flat"
          >
            Login
          </Button>
        )}
      </NavbarContent>

      <NavbarMenu>
        {/* <NavbarMenuItem /> */}
        <NavbarMenuItem>
          <Link href="/">Home</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="/services">Services</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="/about">About</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="/artisans">Artisans</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="/contact">Contact</Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

export default Header;
