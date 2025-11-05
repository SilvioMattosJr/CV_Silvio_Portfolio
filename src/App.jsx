// src/App.jsx

import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

import AnimatedBackground from './components/AnimatedBackground';
import Navigation from './components/Navigation';
import Header from './components/Header';
import ResumoProfissional from './components/ResumoProfissional';
import ExperienciaProfissional from './components/ExperienciaProfissional/ExperienciaProfissional';
import FormacaoAcademica from './components/FormacaoAcademica/FormacaoAcademica';
// << CORREÇÃO: Caminho para a pasta 'components' com 'c' minúsculo >>
import HabilidadesTecnicas from './components/HabilidadesTecnicas'; 
import Certificacoes from './components/Certificacoes/Certificacoes';
import SobreMim from './components/SobreMim/SobreMim';
import PortfolioSection from './components/Portifolio/Portfolio'; 
import { cvData } from './data/cvData'; 
import './styles/global.css';

function App() {
  // --- LÓGICA DO TEMA (sem mudanças) ---
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  // --- LÓGICA DE NAVEGAÇÃO (sem mudanças) ---
  const [activeSection, setActiveSection] = useState('home');
  const [activeNavButton, setActiveNavButton] = useState('Início');

  const handleNavClick = (section, buttonName) => {
    setActiveSection(section);
    setActiveNavButton(buttonName);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'experiencia':
        return <ExperienciaProfissional {...cvData} />;
      case 'formacao':
        return <FormacaoAcademica {...cvData} />;
      case 'habilidades':
        return <HabilidadesTecnicas {...cvData} />;
      case 'certificacoes':
        return <Certificacoes {...cvData} />;
      case 'sobre-mim':
        return <SobreMim {...cvData} />;
      case 'portfolio':
        return <PortfolioSection {...cvData} />;
      case 'home':
      default:
        return (
          <>
            <Header {...cvData} />
            <ResumoProfissional {...cvData} />
          </>
        );
    }
  };

  return (
    <>
      <AnimatedBackground />
      <Navigation 
        onNavClick={handleNavClick} 
        activeButton={activeNavButton}
      />

      {/* << CORREÇÃO: O botão de tema volta a ficar aqui >> */}
      <button className="theme-toggle-btn" onClick={toggleTheme}>
        {theme === 'light' ? <FaMoon /> : <FaSun />}
      </button>

      <div className="cv-container">
        <main className="content-area">
          <div key={activeSection} className="content-wrapper">
            {renderContent()}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;