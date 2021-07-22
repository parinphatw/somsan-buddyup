import React from "react";
import styled from "styled-components";

const NavContainer = ({ children }) => {
  return <nav>{children}</nav>;
};

const NavLogo = ({ imageUrl }) => {
  return <img src={imageUrl} />;
};

const Navbar = () => {
  return (
    <>
      <NavContainer>
        <NavLogo
          imageUrl={"https://assets.skooldio.com/logo/skooldio_logo_square.png"}
        />
        <div>Aloha</div>
      </NavContainer>
    </>
  );
};

export default Navbar;
