import { useAppDispatch, useAppSelector } from '../../reduxTK/store'
import { useCallback } from 'react'
import { changeStatus } from '../../reduxTK/questionsSlice'

export const useButtonBlock = () => {
  const questionStatus = useAppSelector((state) => state.questions.status)
  const questionsLength = useAppSelector((state) => state.questions.questions).length

  const dispatch = useAppDispatch()

  const addButtonDisabled = questionStatus === 'Test'
  const startTestDisabled = questionStatus === 'Test' || questionsLength === 0

  const startTestHandler = useCallback(() => {
    dispatch(changeStatus({ status: 'Test' }))
  }, [dispatch])

  return { addButtonDisabled, startTestDisabled, startTestHandler }
}
