import { useAppSelector } from '../../reduxTK/store'

export const useQuestionStatusCondition = () => {
  const questionStatus = useAppSelector((state) => state.questions.status)
  const questionStatusCondition = questionStatus === 'Test' || questionStatus === 'Test_error'

  return { questionStatusCondition }
}
