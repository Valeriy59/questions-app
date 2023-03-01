import React, {FC, MouseEvent} from 'react'
import styled from "styled-components";

type BasicButtonPropsType = {
  text: string
  margin?: string
  onClick?: () => void
}

export const BasicButton: FC<BasicButtonPropsType> = ({text, margin, onClick}) => {

  const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    onClick && onClick()
  }

  return (
    <div>
      <StyledButton margin={margin} onClick={onClickHandler}>{text}</StyledButton>
    </div>
  )
}

type StyledButtonPropsType = {
  margin?: string
}
const StyledButton = styled.button<StyledButtonPropsType>`
  margin: ${(props) => props.margin ? props.margin : ""};
`