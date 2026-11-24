import React, { useContext } from 'react';
import Nav from '../Nav/Nav';
import { ThemeContext } from '../../context/ThemeContext';

function Header() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <header
      style={{
        backgroundColor: isDark ? '#2b3743' : '#ffffff',
        boxShadow: isDark
          ? '0 2px 8px rgba(0, 0, 0, 0.35)'
          : '0 2px 8px rgba(0, 0, 0, 0.06)',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <Nav />
    </header>
  );
}

export default Header;
