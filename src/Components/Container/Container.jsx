import React from 'react';
import styled from "styled-components"

const StyledContainer = styled.div`
    width: 100%;
    height: ${props => props.height || "auto"};
    max-width: 1200px;
    margin: 0 auto;
`

const Container = (props) => {
    return <StyledContainer {...props} />
};

export default Container;