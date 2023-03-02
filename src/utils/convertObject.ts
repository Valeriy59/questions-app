import { UserAnswerType } from '../reduxTK/questionsSlice'

export const convertObjectWithTest = (object: UserAnswerType) => {
  let newArray = []
  for (const [key, value] of Object.entries(object)) {
    if (Array.isArray(value)) {
      //проверка: ввёл ли пользователь вариант ответа
      if (value.filter((elem) => elem).length === 0) return null
    }
    newArray.push({ [key]: value })
  }
  return newArray
}
