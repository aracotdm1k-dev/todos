import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

function Nav() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const isDark = theme === 'dark';

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '24px 20px',
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: '22px',
          fontWeight: 800,
          color: isDark ? '#ffffff' : '#111517',
          cursor: 'pointer',
          letterSpacing: '0.2px',
        }}
      >
        Where in the world?
      </h1>

      <button
        onClick={toggleTheme}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: isDark ? '#ffffff' : '#111517',
          fontSize: '15px',
          fontWeight: 600,
          padding: '8px 12px',
          borderRadius: '6px',
          transition: 'background-color 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = isDark
            ? 'rgba(255, 255, 255, 0.08)'
            : 'rgba(0, 0, 0, 0.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <span style={{ fontSize: '18px' }}>{isDark ? '☀️' : '🌙'}</span>
        <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
      </button>
    </nav>
  );
}

export default Nav;
