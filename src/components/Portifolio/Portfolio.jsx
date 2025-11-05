// src/components/Portfolio/Portfolio.jsx

import React from 'react';
import { cvData } from '../../data/cvData';
import PortfolioItem from './PortfolioItem';

function Portfolio() {
  const { portfolio } = cvData;

  return <PortfolioItem portfolio={portfolio} />;
}

export default Portfolio;