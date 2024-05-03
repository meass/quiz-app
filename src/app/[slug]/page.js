import ListQuestion from '@/app/components/ListQuestion';
import Score from '@/app/components/Score';
import Level from '../components/Level';
import { Suspense } from 'react';

async function getQuestionApi({ id, level }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api.php?amount=10&category=${id}&difficulty=${level}&type=multiple`
  );
  return res.json();
}

export default async function QuestionPage(params) {
  const { id, level } = params.searchParams;
  let data,
    questionList = [],
    answerList = [];
  // if in url have param level then call api to get all the question
  if (level) {
    data = await getQuestionApi({ id, level });
    questionList = data?.results;
    // add correct answer to random postion in answerList for user to choose
    answerList = questionList?.map((item) => {
      const randomIndex = Math.floor(
        Math.random() * (item.incorrect_answers.length + 1)
      );
      item.incorrect_answers.splice(randomIndex, 0, item.correct_answer);
      return item.incorrect_answers;
    });
  }

  return (
    <main className="text-white px-3 py-8 max-w-[350px] md:max-w-[640px] mx-auto lg:max-w-[1160px] w-full lg:flex lg:items-start lg:justify-between">
      {/* show level component for user to select level of the difficulty if there is level param in url */}
      {!level && (
        <>
          <div className="lg:w-1/2">
            <h1 className="text-4xl pb-4 lg:text-6xl lg:pb-12 lg:leading-[4.5rem]">
              Welcome to the <span className="font-bold">Frontend Quiz!</span>
            </h1>
            <p className="text-sm lg:text-[28px] text-angela-bay">
              <i>Pick a subject to get started.</i>
            </p>
          </div>
          <Suspense>
            <Level />
          </Suspense>
        </>
      )}
      {data && questionList.length > 0 && (
        <>
          <ListQuestion questionList={questionList} answerList={answerList} />
          <Score questionList={questionList} />
        </>
      )}
    </main>
  );
}
