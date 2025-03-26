import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
//import { useTheme } from "../themeContext";
import { useThemeSetValue } from "../themeRecoil";

const HeaderConatiner = styled.header`
  top: 0%;
  left: 0%;
  width: 100%;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  background-color: ${(props) => props.theme.bgColor};
  box-shadow: 0 2px 4px ${(props) => props.theme.borderShadow};
  z-index: 10;
  overflow: hidden;
`;

const LogoContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
  margin-right: 20px;
`;

const Logo = styled(Link)`
  //text-align: start;
  font-size: 30px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
`;

const Writer = styled.div`
  //text-align: start;
  font-size: 12px;
  color: ${(props) => props.theme.textColor};
`;

const MenuContainer = styled.nav`
  display: flex;
  flex-wrap: wrap;
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
  margin: 10px 40px 10px 10px;
  border: 2px solid ${(props) => props.theme.textColor};
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    border: 2px solid ${(props) => props.theme.bgHovorColor};
    background-color: ${(props) => props.theme.bgHovorColor};
    color: ${(props) => props.theme.textHoverColor};
    cursor: pointer;
  }
`;

const Header: React.FC = () => {
  //const { toggleTheme } = useTheme();
  const toggleTheme = useThemeSetValue();

  return (
    <HeaderConatiner>
      <LogoContainer>
        <div>
          <Logo to="" relative="route">
            REACT MASTERCLASS
          </Logo>
        </div>
        <Writer>by 니꼬쌤</Writer>
      </LogoContainer>
      <MenuContainer>
        <NavButton as="button" to="#about" onClick={toggleTheme}>
          Theme
        </NavButton>
        <MenuContainer>
          <NavLink to="" relative="route">
            Home
          </NavLink>
          <NavLink to="Coins">Crypto</NavLink>
          <NavLink to="TodoList">TodoList</NavLink>
        </MenuContainer>
      </MenuContainer>
    </HeaderConatiner>
  );
};

export default Header;
