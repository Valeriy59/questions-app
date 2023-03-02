import { COUNT_QUESTION_OPTIONS } from './constants'
import { convertStringToArrayOfNumber } from './convertArray'

/**
 * returns array of boolean or null
 * @param value
 */
export const validate = (value: string): number[] | null => {
  const onValidate = /^(?:\d,?)+$/.test(value)
  if (onValidate) {
    const rightAnswersArray = convertStringToArrayOfNumber(value)
    if (rightAnswersArray.length <= COUNT_QUESTION_OPTIONS) {
      return rightAnswersArray
    } else return null
  } else return null
}
