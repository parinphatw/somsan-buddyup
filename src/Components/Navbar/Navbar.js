import { children } from "min-document";
import React, { useMemo } from "react";
import styled from "styled-components";
import { ReactComponent as NotiIcon } from "../../icons/bell.svg";

const NavContainer = styled(({ children, className }) => {
  return <nav className={className}>{children}</nav>;
})`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 60px;
  max-height: 63px;
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
  max-height: 63px;
`);

const NavLogo = styled(({ imageUrl, ...props }) => {
  return useMemo(() => {
    return <img src={imageUrl} {...props} />;
  }, [imageUrl]);
})`
  max-height: 45px;
`;

const NavContent = styled(({ className, children }) => {
  return <div className={className}>{children}</div>;
})`
  display: flex;
  flex-direction: row;
  align-items: center;
  *:nth-child(n) {
    text-decoration: None;
    white-space: nowrap;
    color: black;
  }
  *:last-child {
    margin-right: 0;
  }
`;

const UserContainer = styled(({ className, children }) => {
  return <div className={className}>{children}</div>;
})`
  display: flex;
  flex-direction: row;
  align-items: center;
  *:nth-child(n) {
    margin-right: 20px;
  }
  *:nth-child(2) {
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Border = styled(({ className }) => {
  return <div className={className}></div>;
})`
  border-left: 1px solid #faa91a;
  height: 28px;
  margin-right: 20px;
`;

const BuddyUpContainer = styled(({ className, children }) => {
  return <div className={className}>{children}</div>;
})`
  border: 1px solid #faa91a;
  display: flex;
  background-color: #faa91a;
  margin-right: 20px;
  justify-content: space-evenly;
  border-radius: 100px;
  padding: 4px 4px;
  *:nth-child(n) {
    &:hover {
      text-decoration: underline;
    }
  }
`;

const PrivateButton = styled(({ className, children }) => {
  return <div className={className}>{children}</div>;
})`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #faa91a;
  background-color: #faa91a;
  border-radius: 100px;
  padding: 2px 8px;
  color: white;
`;

const BuddyUpButton = styled(({ className, children }) => {
  return <div className={className}>{children}</div>;
})`
  border: 1px solid #faa91a;
  background-color: white;
  border-radius: 100px;
  padding: 2px 8px;
  color: #faa91a;
`;

// const RegisterButton = styled.button`
//   max-width: 120px;
//   width: 100%;
//   height: 40px;
//   border-radius: 100px;
//   border: 2px solid rgb(250, 169, 26);
//   padding: 6px 24px;
//   display: block;
//   background-color: rgb(250, 169, 26);
//   color: white;
//   /* font-family: Roboto; */
// `;

const Navbar = () => {
  return (
    <main>
      <NavContainer>
        <NavBox>
          <NavLogo
            imageUrl={
              "https://assets.skooldio.com/logo/skooldio_logo_square.png"
            }
            alt={"an image"}
          />
          {/* <NavContent>
            <a href="/">คอร์สออนไลน์</a>
            <a href="/">เวิร์กชอป</a>
            <a href="/">สำหรับองค์กร</a>
            <a href="/">บทความ</a>
            <a href="/">เข้าสู่ระบบ</a>
            <RegisterButton>ลงทะเบียน</RegisterButton>
          </NavContent> */}

          <NavContent>
            <BuddyUpContainer>
              <PrivateButton>private</PrivateButton>
              <BuddyUpButton>Buddy Up</BuddyUpButton>
            </BuddyUpContainer>
            <Border />
            <UserContainer>
              <NotiIcon />
              <div>User A</div>
            </UserContainer>
          </NavContent>
        </NavBox>
      </NavContainer>
    </main>
  );
};

export default Navbar;
