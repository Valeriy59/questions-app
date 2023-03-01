import React, {ChangeEvent, FC, useState} from 'react'
import Modal from 'react-modal'
import {BasicButton} from "../BasicButton/BasicButton";
import {Block} from '../../styled-components/common';


type CustomModalPropsType = {
  isOpen: boolean,
  submit: (value: string) => void
  cancel: () => void
}

export const CustomModal: FC<CustomModalPropsType> = ({isOpen, submit, cancel}) => {
  const customStyle = {
    content: {
      top: '5%',
      left: '15%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'transparent(-50%, -50%)',
      width: '200px',
      height: '100px'
    }
  }

  const [inputValue, setInputValue] = useState('')

  const [error, setError] = useState(false)

  const changeInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const submitHandler = () => {
    if (error) {
      setError(false)
    }
    if (inputValue) {
      submit(inputValue)
      setInputValue('')
      cancel()
      setError(false)
    }
    setError(true)
  }

  const cancelHandler = () => {
    cancel()
  }

  return (
    <Modal isOpen={isOpen} style={customStyle}>
      <Block flexDirection={'column'} alignItems={'space-between'}>
        {!error ?
          <>
            <Block>Enter the question text</Block>
            <Block>
              <input type="text" value={inputValue} onChange={changeInputValueHandler}/>
            </Block>
          </>
            : <Block>You will not enter question text. Please, try again</Block>
        }
        <Block justifyContent={'flex-end'}>
          <BasicButton text={'OK'} onClick={submitHandler}/>
          {!error && <BasicButton text={'Cancel'} onClick={cancelHandler}/>}
        </Block>
      </Block>
    </Modal>
  )
}
