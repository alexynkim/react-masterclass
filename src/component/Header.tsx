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
`;

const Logo = styled(Link)`
  text-align: end;
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
  gap: 20px;
`;

const NavLink = styled(Link)`
  //text-decoration: none;
  color: ${(props) => props.theme.textMenuColor};
  font-size: 16px;
  font-weight: 400;
  transition: color 0.3s;
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

        <NavButton as="button" to="#about" onClick={toggleTheme}>
          Theme
        </NavButton>
      </MenuContainer>
    </HeaderConatiner>
  );
};

export default Header;
