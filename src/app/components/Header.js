'use client';
import { useContext, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ScoreContext } from '../scores/ScoreContext';
import style from '@/app/styles/Header.module.css';

export default function Header() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { seletedCategory } = useContext(ScoreContext);
  const { category, saveCategory } = seletedCategory;

  useEffect(() => {
    const categories = JSON.parse(localStorage.getItem('categories'));
    categories.map((item) => {
      if (item.id == id) {
        saveCategory(item);
      }
    });
  }, [id]);

  return (
    <header className={style.container}>
      {category && (
        <div className={style['sub-container']}>
          <div style={{ backgroundColor: `${category.bgColor}` }}>
            <img src={category.icon} alt={category.icon} />
          </div>
          <h2>{category.name}</h2>
        </div>
      )}
      <h1>Quizz App</h1>
    </header>
  );
}
