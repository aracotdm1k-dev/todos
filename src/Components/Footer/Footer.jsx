import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

function Footer() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <footer
      style={{
        backgroundColor: isDark ? '#2b3743' : '#ffffff',
        borderTop: isDark ? '1px solid #364452' : '1px solid #eaeaea',
        padding: '24px 20px',
        textAlign: 'center',
        color: isDark ? '#c4c4c4' : '#666666',
        fontSize: '14px',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <p style={{ margin: 0, fontWeight: 500 }}>
          Where in the world? &copy; {new Date().getFullYear()} — Countries API Project
        </p>
      </div>
    </footer>
  );
}

export default Footer;
