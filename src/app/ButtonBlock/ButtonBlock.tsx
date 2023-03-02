import React, { FC } from 'react'
import { BasicButton } from '../../components/BasicButton/BasicButton'
import { Block } from '../../styled-components/Block/Block'
import { useButtonBlock } from './useButtonBlock'

type ButtonBlockPropsType = {
  changeModalStatus: () => void
}

export const ButtonBlock: FC<ButtonBlockPropsType> = ({ changeModalStatus }) => {
  const { addButtonDisabled, startTestDisabled, startTestHandler } = useButtonBlock()
  return (
    <Block>
      <BasicButton name="Add question" onClick={changeModalStatus} disabled={addButtonDisabled} />
      <BasicButton name="Start test" onClick={startTestHandler} disabled={startTestDisabled} />
    </Block>
  )
}
