import styled from "styled-components";

export const Block = styled.div<any>`
  display: flex;
  height: ${(props) => props.height ? props.height : "100%"};
  flex-direction: ${(props) => props.flexDirection ? props.flexDirection : ""};
  align-items: ${(props) => props.alignItems ? props.alignItems : ""};
  justify-content: ${(props) => props.justifyContent ? props.justifyContent : ""};
`