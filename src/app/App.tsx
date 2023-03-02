import React, { useCallback, useState } from 'react'
import { AppContainer } from '../styled-components/AppContainer/AppContainer'
import { ButtonBlock } from './ButtonBlock/ButtonBlock'
import { CustomModal } from '../components/Modal/CustomModal'
import { useQuestionStatusCondition } from './hooks/useQuestionStatusCondition'
import { Test } from '../components/Test/Test'

function App() {
  const [modalOpenStatus, setModalOpenStatus] = useState<boolean>(false)
  const { questionStatusCondition } = useQuestionStatusCondition()

  const changeModalStatus = useCallback(() => {
    setModalOpenStatus(!modalOpenStatus)
  }, [modalOpenStatus])

  return (
    <AppContainer padding="10px">
      <ButtonBlock changeModalStatus={changeModalStatus} />
      {questionStatusCondition && <Test setIsOpenModal={changeModalStatus} />}
      <CustomModal
        isOpen={modalOpenStatus}
        onClose={changeModalStatus}
        onlyMessage={questionStatusCondition}
      />
    </AppContainer>
  )
}

export default App
