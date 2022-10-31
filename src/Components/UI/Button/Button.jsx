import React from 'react';
import styled from "styled-components";


let StyledButton = styled.button`
  width: ${props => props.width || "150px"};
  height: 35px;
  margin: ${props => props.margin || "20px 0 50px 0"};
  font-size: 16px;
  background-color: ${props => props.bgcolor || "transparent"};
  border: ${props => props.border || "2px solid #a100ff"} ;
  border-radius: 7px;
  color: white;
  cursor: pointer;
  transition: .3s;
  &:hover{
    background-color: #a100ff;
    box-shadow: 1px 1px 10px #a100ff;
  }
`






const Button = (props) => {
    return (
        <StyledButton {...props} />
    );
};

export default Button;