import ListCategory from './components/ListCategory';
import style from '@/app/styles/HomePage.module.css';

const categoryIdsToRetrieve = [
  {
    id: 9,
    icon: '/images/icon-html.svg',
    redirect: '/general-knowledge',
    bgColor: '#FFF1E9',
  },
  {
    id: 18,
    icon: '/images/icon-css.svg',
    redirect: '/science-nature',
    bgColor: '#E0FDEF',
  },
  {
    id: 23,
    icon: '/images/icon-js.svg',
    redirect: '/science-computer',
    bgColor: '#EBF0FF',
  },
  {
    id: 17,
    icon: '/images/icon-accessibility.svg',
    redirect: '/history',
    bgColor: '#F6E7FF',
  },
];

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api_category.php`
  );
  return res.json();
}

export default async function Home() {
  // get all categories
  const data = await getData();

  // get category by id in categoryIdsToRetrieve
  const categoriesToShow = categoryIdsToRetrieve
    .filter((category) =>
      data.trivia_categories.some((item) => item.id === category.id)
    )
    .map((category) => {
      const matchingCategory = data.trivia_categories.find(
        (item) => item.id === category.id
      );
      return {
        ...category,
        name: matchingCategory.name,
      };
    });

  return (
    <main className={style.container}>
      <div className={style['sub-container']}>
        <h1>
          Welcome to the <span className="font-bold">Frontend Quiz!</span>
        </h1>
        <p>
          <i>Pick a subject to get started.</i>
        </p>
      </div>
      <ListCategory categoriesToShow={categoriesToShow} />
    </main>
  );
}
