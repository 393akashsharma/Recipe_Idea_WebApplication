import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled components for the Navbar
const Header = styled.header`
  width: 100%;
  background-color: #1a365d; /* Corrected hex color code */
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.2);
`;

const NavbarWrapper = styled.div`
  max-width: 129.2rem;
  padding-inline: 2.8rem;
  height: 5rem;
  margin-inline: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
 
`;

const Logo = styled.img`
  height: 3.2rem;
  width: auto;
`;

const NavigationWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;

  /* Mobile menu */
  @media (max-width: 991px) {
    display: none;
  }
`;

const MenuBtn = styled.button`
  display: none;
  height: 4rem;
  aspect-ratio: 1 / 1;
  border: none;
  background-color: transparent;
  transition: transform 0.3s ease;
  cursor: pointer;

  img {
    width: 100%;
    object-fit: contain;
  }

  @media (max-width: 991px) {
    display: flex;
  }
`;

const Navigation = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;
  list-style: none;

  li a {
    font-size: 25px;  /* Reduced font size */
    color: white;
    text-decoration: none;
  }

  .btn {
    font-size: 1.8rem;
    padding-inline: 2rem;
    padding-block: 1rem;
    border-radius: 4rem;
    background-color: white;
    border: none;
    color: #4a4a6a;
    cursor: pointer;
  }
`;

const MobileNavigationWrapper = styled.div`
  display: none;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #4a4a6a;
  position: absolute;
  top: 8rem;
  left: 0;
  z-index: 9999;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;

  &.open {
    display: flex;
    max-height: 50vh;
  }

  @media (max-width: 991px) {
    display: flex;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;

    &.open {
      max-height: 50vh;
    }
  }
`;

const MobileNavigation = styled.ul`
  flex-direction: column;
  width: 100%;
  text-align: center;
  gap: 0;

  li {
    width: 100%;
    a {
      display: block;
      width: 100%;
      line-height: 6rem;
      padding: 1rem;
      text-decoration: none;
      color: white;
      font-size: 1.4rem;  /* Reduced font size for mobile too */

      &:hover {
        background-color: #5b5b7a;
      }
    }
  }
`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Handle resize to reset the menu on desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 991) {
        // Desktop view: Reset the menu state
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Header>
      <NavbarWrapper>
        <Logo src="/img/logo.png" alt="Logo" />
        <NavigationWrapper>
          <Navigation>
            <li><a href="/">Home</a></li>
            <li><a href="/category">Category</a></li>
            <li><a href="/about">About</a></li>
          </Navigation>
        </NavigationWrapper>
        <MenuBtn onClick={toggleMenu}>
          {menuOpen ? (
            <img
              src="/img/close-menu.png"
              alt="Close Menu"
              className="menu-icon"
            />
          ) : (
            <img
              src="/img/menu-icon.png"
              alt="Menu Icon"
              className="menu-icon"
            />
          )}
        </MenuBtn>
      </NavbarWrapper>

      <MobileNavigationWrapper className={menuOpen ? 'open' : ''}>
        <MobileNavigation>
          <li><a href="/">Home</a></li>
          <li><a href="/category">Category</a></li>
          <li><a href="/about">About</a></li>
        </MobileNavigation>
      </MobileNavigationWrapper>
    </Header>
  );
};

export default Navbar;
