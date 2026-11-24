import React, { useContext } from 'react';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';
import Footer from './Components/Footer/Footer';

function AppContent() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: isDark ? '#202c37' : '#fafafa',
        color: isDark ? '#ffffff' : '#111517',
        transition: 'background-color 0.3s ease, color 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <div style={{ flex: 1 }}>
        <Main />
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
