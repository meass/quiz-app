'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import style from '@/app/styles/Level.module.css';

const LEVELS = [
  {
    id: 1,
    value: 'easy',
    icon: '/images/icon-easy.svg',
    bgColor: '#F4E7E7',
  },
  {
    id: 2,
    value: 'medium',
    icon: '/images/icon-medium.svg',
    bgColor: '#F0EBFF',
  },
  {
    id: 3,
    value: 'hard',
    icon: '/images/icon-hard.svg',
    bgColor: '#EBF0FF',
  },
];

export default function Level() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const pathname = usePathname();

  return (
    <ul className={style.container}>
      {LEVELS.map((item) => (
        <li
          key={item.id}
          onClick={() =>
            router.push(`${pathname}?id=${id}&level=${item.value}`)
          }
        >
          <button>
            <div
              style={{ backgroundColor: `${item.bgColor}` }}
              className={style['icon-container']}
            >
              <img src={item.icon} alt="icon-html" />
            </div>
            <span>{item.value}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
