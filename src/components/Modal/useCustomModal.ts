import { useAppDispatch, useAppSelector } from '../../reduxTK/store'
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { COUNT_QUESTION_OPTIONS } from '../../utils/constants'
import {
  changeStatus,
  createAnswerOptions,
  createQuestion,
  createRightAnswers,
  deleteQuestion,
  setMessage,
} from '../../reduxTK/questionsSlice'
import { validate } from '../../utils/validate'

export const useCustomModal = (onClose: () => void) => {
  const dispatch = useAppDispatch()
  const questionStatus = useAppSelector((state) => state.questions.status)
  const currentQuestionID = useAppSelector((state) => state.questions.currentQuestionID)
  const message = useAppSelector((state) => state.questions.message)

  const [values, setValues] = useState<string[]>([])
  const [inputValue, setInputValue] = useState<string>('')

  const label = useMemo(() => {
    switch (questionStatus) {
      case null:
      case 'Editing_completed': {
        return 'Enter question text'
      }
      case 'Question_added':
        return `Enter ${values.length + 1} answer`
      case 'Answer_options_added':
        return 'Enter numbers of right answer by comma'
      default:
        return ''
    }
  }, [questionStatus, values])

  useEffect(() => {
    if (values.length === COUNT_QUESTION_OPTIONS) {
      dispatch(createAnswerOptions({ answerOptions: values, id: currentQuestionID }))
      setValues([])
    }
  }, [values, currentQuestionID, dispatch])

  const changeInputValueHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setMessage(null))
      setInputValue(e.currentTarget.value)
    },
    [dispatch]
  )

  const setResetValueAndMessage = () => {
    setInputValue('')
    dispatch(setMessage(null))
  }

  const addQuestionTitle = (value: string) => {
    if (value) {
      dispatch(createQuestion(value))
      setResetValueAndMessage()
    } else {
      dispatch(setMessage('You will not enter the question. Please try again.'))
    }
  }
  const addQuestionOption = (value: string) => {
    if (value) {
      setResetValueAndMessage()
      dispatch(setMessage(null))
    } else {
      dispatch(setMessage(`You will not enter ${value.length + 1} answer! Please try again.`))
    }
  }
  const addRightAnswers = (value: string) => {
    if (value) {
      const rightAnswers = validate(value)
      if (rightAnswers) {
        dispatch(createRightAnswers({ rightAnswers: rightAnswers, id: currentQuestionID }))
        setResetValueAndMessage()
        onClose()
      } else {
        dispatch(setMessage('Incorrect data. Please try again.'))
      }
    } else {
      dispatch(setMessage('You will not enter the numbers of right answers! Please try again.'))
    }
  }
  const onCloseModalHandler = () => {
    if (questionStatus === null) {
      setResetValueAndMessage()
    } else if (questionStatus === 'Test_error') {
      dispatch(changeStatus({ status: 'Test' }))
    } else {
      dispatch(deleteQuestion({ id: currentQuestionID }))
    }
    onClose()
  }

  const onSubmitHandler = () => {
    switch (questionStatus) {
      case null:
      case 'Editing_completed': {
        addQuestionTitle(inputValue)
        break
      }
      case 'Question_added': {
        addQuestionOption(inputValue)
        break
      }
      case 'Answer_options_added': {
        addRightAnswers(inputValue)
        break
      }
      case 'Test':
      case 'Test_error': {
        dispatch(changeStatus({ status: null }))
        dispatch(setMessage(null))
        onCloseModalHandler()
        break
      }
      default:
        return
    }
  }

  return {
    label,
    message,
    inputValue,
    changeInputValueHandler,
    onSubmitHandler,
    onCloseModalHandler,
  }
}
