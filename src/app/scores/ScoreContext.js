'use client';

import { createContext, useState } from 'react';
export const ScoreContext = createContext(0);

export const ScoreProvider = ({ children }) => {
  const calculateScore = (value) => {
    setScores((prevScore) => ({
      score: value > 0 ? prevScore.score + value : value,
      calculateScore,
    }));
  };
  const [scores, setScores] = useState({
    score: 0,
    calculateScore,
  });

  const calculateQuestionIndex = (value) => {
    setStartQuestionIndex((prevIndex) => ({
      startIndex: value > 0 ? prevIndex.startIndex + value : value,
      calculateQuestionIndex,
    }));
  };
  const [startQuestionIndex, setStartQuestionIndex] = useState({
    startIndex: 0,
    calculateQuestionIndex,
  });

  const saveCategory = (value) => {
    setSelectedCategory(() => ({
      category: value,
      saveCategory,
    }));
  };
  const [seletedCategory, setSelectedCategory] = useState({
    category: null,
    saveCategory,
  });

  return (
    <ScoreContext.Provider
      value={{ scores, startQuestionIndex, seletedCategory }}
    >
      {children}
    </ScoreContext.Provider>
  );
};
