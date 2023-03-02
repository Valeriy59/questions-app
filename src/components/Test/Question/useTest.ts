import { useAppDispatch, useAppSelector } from '../../../reduxTK/store'
import { changeStatus, setMessage } from '../../../reduxTK/questionsSlice'
import { checkAnswers } from '../../../utils/checkAnswers'

export const useTest = (setIsOpenModal: () => void) => {
  const questions = useAppSelector((state) => state.questions.questions)
  const answers = useAppSelector((state) => state.questions.userAnswers)
  const dispatch = useAppDispatch()

  const rightAnswers = questions.map((elem) => ({ [elem.id]: elem.rightAnswers }))
  const answersToArray = Object.keys(answers).map((key) => ({ [key]: answers[key] }))
  const questionsCount = questions.length

  const addMessage = (message: string) => {
    dispatch(setMessage(message))
  }
  const endTestHandler = () => {
    const result = checkAnswers(answersToArray, rightAnswers)
    switch (result) {
      case []: {
        addMessage(`Your result is ${questionsCount} from ${questionsCount}. Good job!`)
        break
      }
      case null: {
        addMessage('All questions should have at least one answer. Please, check your filling')
        dispatch(changeStatus({ status: 'Test_error' }))
        break
      }
      default:
        {
          addMessage(
            `You made a mistake in questions №: ${result.join(', ')}. Your result is ${
              questionsCount - result?.length
            } from ${questionsCount}.`
          )
        }
        setIsOpenModal()
        break
    }
  }
  return { questions, endTestHandler }
}
