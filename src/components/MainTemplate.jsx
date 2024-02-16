import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
`;

const MainTemplate = ({ children }) => {
    return (
        <>
            <StyledDiv>{children}</StyledDiv>
        </>
    );
};

export default MainTemplate;
