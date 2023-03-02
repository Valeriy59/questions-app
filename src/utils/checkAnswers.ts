import _ from 'lodash'
import { UserAnswerType } from '../reduxTK/questionsSlice'

/**
 * returns an empty array if the test passed;
 * returns an array of question numbers in which an error was made;
 * returns null if no response was given
 * @param userAnswers
 * @param rightAnswers
 */
export const checkAnswers = (
  userAnswers: UserAnswerType[],
  rightAnswers: UserAnswerType[]
): number[] | [] | null => {
  //если пользователь пропустил вопрос, возвращаем null
  if (!userAnswers) return null
  //находим номера вопросов, в которых пользователь ошибся
  let resultArray = []
  for (let i = 0; i < rightAnswers.length; i++) {
    if (!_.isEqual(rightAnswers[i], userAnswers[i])) {
      resultArray.push(i)
    }
  }
  return resultArray.map((elem) => elem + 1)
}
