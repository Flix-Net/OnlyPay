import React from 'react';
import styled from "styled-components";

const StyledTextArea = styled.textarea`
  padding: 5px;
  width: 600px;
  height: ${props => props.height || "200px"};
  font-size: ${props => props.fsize || "24px"};
  border-radius: 10px;
  outline: none;
  border: 1px solid black;
  resize: none;
`

const TextArea = (props) => {
    return (
        <StyledTextArea {...props} />
    );
};

export default TextArea;