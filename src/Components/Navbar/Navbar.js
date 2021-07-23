import React, { useMemo } from "react";
import styled from "styled-components";

const NavContainer = styled(({ children, className }) => {
  return <nav className={className}>{children}</nav>;
})`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 60px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  box-shadow: 0 2px 28px 0 rgba(0, 0, 0, 0.05);
  background-color: rgb(255, 255, 255);
  font-family: Roboto;
`;

const NavBox = React.memo(styled(({ children, className }) => {
  return <div className={className}>{children}</div>;
})`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`);

const NavLogo = styled(({ imageUrl, ...props }) => {
  return useMemo(() => {
    return <img src={imageUrl} {...props} />;
  }, [imageUrl]);
})`
  max-height: 60px;
  width: 158px;
`;

const NavContent = styled(({ className, children }) => {
  return <div className={className}>{children}</div>;
})`
  display: flex;
  flex-direction: row;
  align-items: center;
  a:nth-child(n) {
    text-decoration: None;
    margin-right: 20px;
    white-space: nowrap;
    color: black;
    &:hover {
      text-decoration: underline;
    }
  }
  button {
    margin-right: 0;
  }
`;

const RegisterButton = styled.button`
  max-width: 120px;
  width: 100%;
  height: 40px;
  border-radius: 100px;
  border: 2px solid rgb(250, 169, 26);
  padding: 6px 24px;
  display: block;
  background-color: rgb(250, 169, 26);
  color: white;
  /* font-family: Roboto; */
`;

const Navbar = () => {
  return (
    <main>
      <NavContainer>
        <NavBox>
          <NavLogo
            imageUrl={
              "https://www.skooldio.com/static/images/Skooldio_Logo.svg"
            }
            alt={"an image"}
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
    </main>
  );
};

export default Navbar;
