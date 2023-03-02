import { ChangeEvent, FC, memo, useEffect, useState } from 'react'
import { addUserAnswer, QuestionType } from '../../../reduxTK/questionsSlice'
import { useAppDispatch } from '../../../reduxTK/store'
import { Block } from '../../../styled-components/Block/Block'

type QuestionPropsType = {
  question: QuestionType
  questionNumber: number
}
export const Question: FC<QuestionPropsType> = memo(({ question, questionNumber }) => {
  const dispatch = useAppDispatch()
  const [userAnswer, setUserAnswer] = useState<number[]>([])

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>, answer: number) => {
    const newUserAnswer = event.currentTarget.checked
      ? [...userAnswer, answer]
      : userAnswer.filter((el) => el !== answer)
    setUserAnswer(newUserAnswer)
  }

  useEffect(() => {
    dispatch(addUserAnswer({ id: question.id, answers: userAnswer }))
  }, [userAnswer, dispatch, question.id])

  return (
    <Block flexDirection="column" alignItems="flex-start">
      <h4>{`${questionNumber}. ${question.title}`}</h4>

      {question.answerOptions.map((elem, index) => (
        <div key={index}>
          <input type="checkbox" onChange={(event) => onChangeHandler(event, index)} />
          <span> {elem} </span>
        </div>
      ))}
    </Block>
  )
})
