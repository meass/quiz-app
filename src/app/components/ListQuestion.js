'use client';
import parse from 'html-react-parser';
import { useContext, useState } from 'react';
import { ScoreContext } from '../scores/ScoreContext';
import style from '@/app/styles/ListQuestion.module.css';

const UNSET = 'unset';
const CORRECT = 'correct';
const INCORRECT = 'incorrect';

export default function ListQuestion({ questionList, answerList }) {
  const { scores, startQuestionIndex } = useContext(ScoreContext);
  const { startIndex, calculateQuestionIndex } = startQuestionIndex;
  const [answer, setAnswer] = useState({ index: -1, item: '', value: UNSET });
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  // generate aphalbet from A to Z to use later in question
  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  const handleSubmit = () => {
    //when user not selected any answer and click submit display error message
    if (answer.item === '') {
      setError(true);
    }
    // when user answer to the last question call handleNext
    else if (startIndex == questionList.length - 1) {
      handleNext();
    } else {
      // remove not selected any answer
      setError(false);
      // when user already seleted and submit answer, they can select another answer option again
      setDisabled(true);
      // store correct or wrong answer made by user
      const isAnswerCorrect =
        questionList[startIndex].correct_answer === answer.item;

      setAnswer({
        ...answer,
        value: isAnswerCorrect ? CORRECT : INCORRECT,
      });

      // count score of user
      if (isAnswerCorrect) {
        scores.calculateScore(1);
      }
    }
  };

  const handleNext = () => {
    // when question not yet reach last question, keep moving to next qustion and reset answer state
    if (startIndex < questionList.length) {
      calculateQuestionIndex(1);
      setAnswer({ index: -1, item: '', value: UNSET });
      setDisabled(false);
    }
  };

  const handleSelectedAnswer = ({ index, item }) => {
    setError(false);
    setAnswer({
      index,
      item,
      value: UNSET,
    });
  };

  const isLastQuestion =
    answer.value === UNSET || startIndex === questionList.length - 1;
  const buttonText = isLastQuestion ? 'Submit Answer' : 'Next Question';
  const buttonAction = isLastQuestion ? handleSubmit : handleNext;

  return (
    startIndex < questionList.length && (
      <div className={style.container}>
        <div className={style['sub-container']}>
          <span>
            <i>
              Question {startIndex + 1} of {questionList.length}
            </i>
          </span>
          <h1>{parse(questionList[startIndex].question)}</h1>
        </div>
        <div className={style['sub-container']}>
          {/* display list of question */}
          <ol>
            {answerList[startIndex].map((item, index) => {
              const isCorrect =
                index === answer.index && answer.value === CORRECT;
              const isInCorrect =
                index === answer.index && answer.value === INCORRECT;
              const borderStyle = isCorrect
                ? 'border-2 border-envy-love'
                : isInCorrect && 'border-2 border-khmer-curry';
              const bgStyle = isCorrect
                ? '!bg-envy-love !text-white'
                : isInCorrect && '!bg-khmer-curry !text-white';

              return (
                <li
                  key={index}
                  className={`group ${borderStyle} ${
                    index == answer.index &&
                    answer.value === UNSET &&
                    'border-2 border-cool-purple'
                  } ${!disabled && 'hover:border-2 hover:border-cool-purple'}`}
                  onClick={() =>
                    !disabled && handleSelectedAnswer({ index, item })
                  }
                >
                  <span
                    className={`${bgStyle} ${
                      !disabled &&
                      'group-hover:bg-cool-purple group-hover:text-white'
                    } ${
                      index == answer.index &&
                      answer.value === UNSET &&
                      '!bg-cool-purple !text-white'
                    }`}
                  >
                    {alphabet[index]}
                  </span>
                  <span>{parse(item)}</span>
                  {isInCorrect && (
                    <img
                      className="w-8 ml-auto"
                      src="/images/icon-incorrect.svg"
                      alt="icon-incorrect"
                    />
                  )}
                  {isCorrect && (
                    <img
                      className="w-8 ml-auto"
                      src="/images/icon-correct.svg"
                      alt="icon-correct"
                    />
                  )}
                </li>
              );
            })}
          </ol>

          {/* display Submit Answer, Next Question button */}
          <button onClick={buttonAction} className={style['submit-btn']}>
            {buttonText}
          </button>

          {/* display not selected any answer */}
          {error && (
            <div className={style['error-text']}>
              <img
                className="max-w-8"
                src="/images/icon-error.svg"
                alt="icon-error"
              />
              <span>Please select an answer</span>
            </div>
          )}
        </div>
      </div>
    )
  );
}
