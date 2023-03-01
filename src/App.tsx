import React, {useCallback, useState} from 'react';
import {BasicButton} from "./components/BasicButton/BasicButton";
import styled from "styled-components";
import {CustomModal} from "./components/Modal/CustomModal";
import {Block} from "./styled-components/common";
import {createQuestion, questionsSelector} from "./reduxTK/questionsSlice";
import {useAppDispatch, UseAppSelector} from "./reduxTK/store";

function App() {

  const [isOpen, setIsOpen] = useState(false)

  const dispatch = useAppDispatch()
  const questions = UseAppSelector(questionsSelector)

  const addQuestionHandler = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  const changeStateInputValueHandler = useCallback((value: string) => {
    dispatch(createQuestion(value))
  }, [])


  return (
    <AppContainer padding={'50px 20px'}>
      <Block>Current questions: {questions.map(el => el.question)}</Block>
      <BasicButton text={'Add question'} onClick={addQuestionHandler}/>
      <BasicButton text={'Start test'} margin={'0 10px'}/>
     <CustomModal isOpen={isOpen} submit={changeStateInputValueHandler} cancel={closeModal}/>
    </AppContainer>
  );
}

export default App;


type AppContainerPropsType = {
  padding?: string
}
const AppContainer = styled.div<AppContainerPropsType>`
  display: flex;
  padding: ${(props) => props.padding ? props.padding : ""};
`
