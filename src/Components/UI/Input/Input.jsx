import React from 'react';
import styled from "styled-components";

const BlockInput = styled.input`
  box-sizing: border-box;
  width: ${props => props.width || "244px"};
  height: 40px;
  margin: 15px 0;
  font-size: 20px;
  font-style: italic;
  text-align: center;
  outline: none;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${props => props.borbotCol || "#03A9F4"};
  color: #a9c8e0;
  transition: .3s;
`

const Input = (props) => {
    return (
        <BlockInput {...props} />
    );
};

export default Input;