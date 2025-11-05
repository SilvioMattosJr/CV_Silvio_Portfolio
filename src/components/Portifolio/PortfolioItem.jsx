// src/components/Portfolio/PortfolioItem.jsx

import React, { useState, useEffect } from 'react';
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGithub,
  FaExternalLinkAlt,
  FaTimes
} from 'react-icons/fa';

// Função para mapear nomes de tecnologias a seus ícones
const getTechIcon = (tech) => {
  const icons = {
    'HTML': <FaHtml5 />,
    'CSS': <FaCss3Alt />,
    'JavaScript': <FaJs />,
    'React': <FaReact />,
    // Adicione mais mapeamentos aqui se necessário
  };
  return icons[tech] || null;
};

// Função para mapear nomes de tecnologias a suas URLs oficiais
const getTechUrl = (tech) => {
  const urls = {
    'HTML': 'https://developer.mozilla.org/pt-BR/docs/Web/HTML',
    'CSS': 'https://developer.mozilla.org/pt-BR/docs/Web/CSS',
    'JavaScript': 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript',
    'React': 'https://react.dev/',
  };
  return urls[tech] || '#'; // Retorna '#' se não houver URL
};

// Importa todas as imagens da pasta 'portfolio'
const rawImages = import.meta.glob('../../assets/portfolio/*.{png,jpg,jpeg,svg}', {
  eager: true,
});

// Processa as imagens com validação
const projectImages = Object.entries(rawImages).reduce((acc, [path, module]) => {
  const fileName = path.split('/').pop();
  // CORREÇÃO: Verifica se module.default existe
  if (module && module.default) {
    acc[fileName] = module.default;
  } else {
    console.warn(`Imagem não encontrada: ${fileName}`);
  }
  return acc;
}, {});

function PortfolioItem({ portfolio = [] }) { // CORREÇÃO: valor padrão para portfolio
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [modalImage, setModalImage] = useState(null);
  const [activeDetailImageIndex, setActiveDetailImageIndex] = useState(0);

  // CORREÇÃO: Validações para evitar erros
  if (!portfolio || portfolio.length === 0) {
    return <div>Nenhum projeto disponível</div>;
  }

  const activeProject = portfolio[activeProjectIndex];
  const totalProjects = portfolio.length;
  const hasMultipleProjects = totalProjects > 1;
  
  // CORREÇÃO: Valida arrays de imagens
  const projectImagesArray = activeProject?.imagens || [];
  const totalDetailImages = projectImagesArray.length;

  const handleNextProject = () => {
    setActiveProjectIndex((prevIndex) => (prevIndex + 1) % totalProjects);
    setActiveImageIndex(0);
    setActiveDetailImageIndex(0);
  };

  const handlePrevProject = () => {
    setActiveProjectIndex((prevIndex) => (prevIndex - 1 + totalProjects) % totalProjects);
    setActiveImageIndex(0);
    setActiveDetailImageIndex(0);
  };

  // CORREÇÃO: Valida nextProject
  const nextProject = portfolio[(activeProjectIndex + 1) % totalProjects];
  const nextProjectImages = nextProject?.imagens || [];
  const nextProjectFirstImage = nextProjectImages.length > 0 ? nextProjectImages[0] : null;

  const openModal = (imageName) => {
    const imageUrl = projectImages[imageName];
    if (imageUrl) {
      setModalImage(imageUrl);
    } else {
      console.error(`ERRO: Imagem "${imageName}" não foi encontrada.`);
    }
  };

  const closeModal = () => {
    setModalImage(null);
  };
  
  const handleNextDetailImage = () => {
    setActiveDetailImageIndex((prevIndex) => (prevIndex + 1) % totalDetailImages);
  };

  const handlePrevDetailImage = () => {
    setActiveDetailImageIndex((prevIndex) => (prevIndex - 1 + totalDetailImages) % totalDetailImages);
  };
  
  // CORREÇÃO: Valida índices das imagens
  const currentDetailImage = projectImagesArray[activeDetailImageIndex];
  const prevDetailImage = projectImagesArray[(activeDetailImageIndex - 1 + totalDetailImages) % totalDetailImages];
  const nextDetailImage = projectImagesArray[(activeDetailImageIndex + 1) % totalDetailImages];

  // CORREÇÃO: Função auxiliar para obter imagem com fallback
  const getImageSrc = (imageName) => {
    return projectImages[imageName] || '/path/to/fallback/image.jpg';
  };

  return (
    <div className="portfolio-container">
      {/* Card Principal */}
      <div className="portfolio-main-card">
        <div className="portfolio-info">
          <h2>{activeProject?.nome || 'Projeto sem nome'}</h2>
          <p>{activeProject?.descricao || 'Descrição não disponível'}</p>
          <div className="portfolio-tech-icons">
            {activeProject.tecnologias.map((tech, index) => (
              <a
                key={index}
                href={getTechUrl(tech)}
                target="_blank"
                rel="noopener noreferrer"
                title={tech}
              >
                {getTechIcon(tech)}
              </a>
            ))}
          </div><div className="portfolio-links">
            {activeProject?.linkDemo && (
              <a href={activeProject.linkDemo} target="_blank" rel="noopener noreferrer" className="portfolio-link">
                <FaExternalLinkAlt />
              </a>
            )}
            {activeProject?.linkRepositorio && (
              <a href={activeProject.linkRepositorio} target="_blank" rel="noopener noreferrer" className="portfolio-link">
                <FaGithub />
              </a>
            )}
          </div>
        </div>

        <div className="portfolio-carousel">
          {hasMultipleProjects && (
            <button className="carousel-btn next-btn" onClick={handleNextProject}>
              {'>'}
            </button>
          )}

          {/* CORREÇÃO: Valida se há imagens */}
          {projectImagesArray.length > 0 && (
            <img
              src={getImageSrc(projectImagesArray[activeImageIndex])}
              alt={`${activeProject.nome} screenshot ${activeImageIndex + 1}`}
              className="carousel-image active-image"
            />
          )}

          {hasMultipleProjects && nextProjectFirstImage && (
            <img
              src={getImageSrc(nextProjectFirstImage)}
              alt={`Preview of ${nextProject.nome}`}
              className="carousel-image next-image"
              onClick={handleNextProject}
            />
          )}
        </div>
      </div>

      {/* Card de Detalhes */}
      <div className="portfolio-details-card">
        <h3>Detalhes do Projeto</h3>
        <p>{activeProject?.detalhes || 'Detalhes não disponíveis'}</p>
        
        {totalDetailImages > 0 && (
          <div className="details-carousel-container">
            <button className="carousel-btn prev-btn details-carousel-btn" onClick={handlePrevDetailImage}>
              {'<'}
            </button>

            {/* CORREÇÃO: Valida se as imagens existem antes de renderizar */}
            {prevDetailImage && (
              <img
                src={getImageSrc(prevDetailImage)}
                alt={`Previous detail of ${activeProject.nome}`}
                className="carousel-image prev-image"
                onClick={handlePrevDetailImage}
              />
            )}

            {currentDetailImage && (
              <img
                src={getImageSrc(currentDetailImage)}
                alt={`Detail view ${activeDetailImageIndex + 1} of ${activeProject.nome}`}
                className="carousel-image active-image"
                onClick={() => openModal(currentDetailImage)}
              />
            )}

            {nextDetailImage && (
              <img
                src={getImageSrc(nextDetailImage)}
                alt={`Next detail of ${activeProject.nome}`}
                className="carousel-image next-image"
                onClick={handleNextDetailImage}
              />
            )}

            <button className="carousel-btn next-btn details-carousel-btn" onClick={handleNextDetailImage}>
              {'>'}
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>
              <FaTimes />
            </button>
            <img src={modalImage} alt="Amplified view" />
          </div>
        </div>
      )}
    </div>
  );
}

export default PortfolioItem;