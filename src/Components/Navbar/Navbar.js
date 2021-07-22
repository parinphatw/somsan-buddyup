import React from "react";
import styled from "styled-components";

const NavContainer = styled(({ children, className }) => {
  return <nav className={className}>{children}</nav>;
})`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  box-shadow: 0 2px 28px 0 rgba(0, 0, 0, 0.05);
`;

const NavBox = styled(({ children, className }) => {
  return <div className={className}>{children}</div>;
})`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const NavLogo = styled(({ imageUrl, ...props }) => {
  return <img src={imageUrl} {...props} />;
})`
  max-height: 60px;
  width: 158px;
`;

const NavContent = styled(({ className, children }) => {
  return <div className={className}>{children}</div>;
})`
  display: flex;
  flex-direction: row;
  a:nth-child(n) {
    text-decoration: None;
    margin-right: 20px;
    white-space: nowrap;
  }
  button {
    margin-right: 0;
  }
`;

const RegisterButton = styled.button`
  max-width: 120px;
  width: 100%;
  height: 40px;
  border-radius: 50px;
  background-color: #5eb7ef;
  padding: 6px 24px;
  display: block;
  color: white;
`;

const Navbar = () => {
  return (
    <>
      <NavContainer>
        <NavBox>
          <NavLogo
            imageUrl={
              "https://www.skooldio.com/static/images/Skooldio_Logo.svg"
            }
          />
          <NavContent>
            <a href="/">คอร์สออนไลน์</a>
            <a href="/">เวิร์กชอป</a>
            <a href="/">สำหรับองค์กร</a>
            <a href="/">บทความ</a>
            <a href="/">เข้าสู่ระบบ</a>
            <RegisterButton>ลงทะเบียน</RegisterButton>
          </NavContent>
        </NavBox>
      </NavContainer>
    </>
  );
};

export default Navbar;
