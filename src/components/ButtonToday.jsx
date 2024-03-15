import React from 'react';
import styled from 'styled-components';

const ButtonTodayBlock = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 25px;
    margin-top: 10px;
    margin-right: 70px;
    margin-left: 100%;
    text-align: center;
    border-radius: 12px;
    font-size: 0.8em;
    line-height: 0.8em;
    font-weight: 800;
    background-color: #6699ff;
    color: #ffffff;
    border: 0;
`;

function ButtonToday({ text, onClick }) {
    return <ButtonTodayBlock onClick={onClick}>{text}</ButtonTodayBlock>;
}

export default ButtonToday;
