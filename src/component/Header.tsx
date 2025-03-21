import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTheme } from "../themecontext";

const HeaderConatiner = styled.header`
  top: 0%;
  left: 0%;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  background-color: ${(props) => props.theme.bgColor};
  box-shadow: 0 2px 4px ${(props) => props.theme.borderShadow};
  z-index: 10;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  gap: 3px;
  margin-right: 20px;
`;

const Logo = styled(Link)`
  text-align: start;
  font-size: 30px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
`;

const Writer = styled.div`
  text-align: end;
  font-size: 12px;
  color: ${(props) => props.theme.textColor};
`;

const MenuContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const NavLink = styled(Link)`
  color: ${(props) => props.theme.textMenuColor};
  font-size: 16px;
  font-weight: 400;
  transition: color 0.3s;
  margin: 0px 8px;
  &:hover {
    color: ${(props) => props.theme.textColor};
    font-weight: bold;
  }
`;

const NavButton = styled(Link)`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  font-size: 16px;
  font-weight: 600;
  padding: 8px 16px;
  margin: 0 px 8px;
  border: 2px solid ${(props) => props.theme.textColor};
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    border: 2px solid ${(props) => props.theme.bgHovorColor};
    background-color: ${(props) => props.theme.bgHovorColor};
    color: ${(props) => props.theme.textHoverColor};
  }
`;

const Header: React.FC = () => {
  const { toggleTheme } = useTheme();
  return (
    <HeaderConatiner>
      <LogoContainer>
        <Logo to="" relative="route">
          REACT MASTERCLASS
        </Logo>
        <Writer>by 니꼬쌤</Writer>
      </LogoContainer>
      <MenuContainer>
        <NavButton as="button" to="#about" onClick={toggleTheme}>
          Theme
        </NavButton>
        <NavLink to="" relative="route">
          Home
        </NavLink>
        <NavLink to="Coins">Crypto</NavLink>
        <NavLink
          to="https://nomadcoders.co/react-masterclass/lobby"
          target="_blank"
          rel="noopener noreferrer"
        >
          Course
        </NavLink>
        <NavLink
          to="https://nomadcoders.co/c/reactjs-challenge/lobby"
          target="_blank"
          rel="noopener noreferrer"
        >
          Challenge
        </NavLink>
      </MenuContainer>
    </HeaderConatiner>
  );
};

export default Header;
