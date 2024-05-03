'use client';
import { useContext } from 'react';
import { ScoreContext } from '../scores/ScoreContext';
import { useRouter } from 'next/navigation';
import style from '@/app/styles/Score.module.css';

export default function Score({ questionList }) {
  const router = useRouter();
  const { scores, startQuestionIndex, seletedCategory } =
    useContext(ScoreContext);
  const { startIndex, calculateQuestionIndex } = startQuestionIndex;
  const { calculateScore, score } = scores;
  const { category, saveCategory } = seletedCategory;

  const redirect = () => {
    calculateQuestionIndex(0);
    calculateScore(0);
    saveCategory(null);
    router.push('/');
  };

  return (
    startIndex == questionList.length && (
      <div className={style.container}>
        <h1>
          Quiz completed <span className="font-bold">You scored...</span>
        </h1>
        <div className={style['sub-container']}>
          <div className={style.section}>
            <div className="flex items-center gap-4">
              <div
                style={{ backgroundColor: `${category.bgColor}` }}
                className={style['icon-container']}
              >
                <img src={category.icon} alt={category.name} />
              </div>
              <h2>{category.name}</h2>
            </div>
            <h3>{score}</h3>
            <p>out of {questionList.length}</p>
          </div>
          <button onClick={redirect}>Play Again</button>
        </div>
      </div>
    )
  );
}
