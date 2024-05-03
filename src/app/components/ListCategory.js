'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import style from '@/app/styles/ListCategory.module.css';

export default function ListCategory({ categoriesToShow }) {
  const router = useRouter();

  useEffect(() => {
    // store all categories in localStorage for using in HEADER
    localStorage.setItem('categories', JSON.stringify(categoriesToShow));
  }, []);

  const redirectAndSaveCategory = (category) => {
    router.push(`${category.redirect}?id=${category.id}`);
  };

  return (
    <ul className={style.container}>
      {categoriesToShow.map((category) => (
        <li key={category.id} onClick={() => redirectAndSaveCategory(category)}>
          <button>
            <div
              style={{ backgroundColor: `${category.bgColor}` }}
              className={style['icon-container']}
            >
              <img src={category.icon} alt="icon-html" />
            </div>
            <span>{category.name}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
