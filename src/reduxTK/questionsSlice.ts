import {createAction, createSlice, nanoid} from "@reduxjs/toolkit";
import {RootState} from "./store";

export type QuestionType = {
  id: string
  question: string
  answers: string[]
  trueAnswers: number[]
}
export type StateType = {
  questions: QuestionType[]
}

export const createQuestion = createAction<string>('createQuestion')

export const questionsSlice = createSlice({
  name: 'questions',
  initialState:{
    questions: []
  } as StateType,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        createQuestion,
        (state, action) => {
          const newQuestion: QuestionType = {
            id: nanoid(),
            question: action.payload,
            trueAnswers: [],
            answers: []
          }
          state.questions = [...state.questions, newQuestion]
        }
      )
  }
})

export const {} = questionsSlice.actions
export const questionsSelector = (state: RootState) => state.questions.questions