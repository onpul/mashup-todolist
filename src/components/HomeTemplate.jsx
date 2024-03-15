import React, { useState } from 'react';
import CalendarTemplate from './CalendarTemplate';
import TodoList from './TodoList';
import styled from 'styled-components';
import { useShowDispatch, useTodoState } from '../TodoContext';
import moment from 'moment';

const HomeTemplateBlock = styled.div``;
const ButtonBlock = styled.div`
    font-size: 1em;
    height: 40px;
    background: #ffffff;
    /* box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3); */
    border-radius: 20px;
    font-weight: 900;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    color: #6699ff;
    margin-top: 10px;
    cursor: pointer;
    div {
        text-align: center;
    }

    #all {
        color: #ff6b6b;
    }
`;

const ListBlock = styled.div`
    padding: 5px 10px;
    margin-top: 10px;
    background: #ffffff;
    /* box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3); */
    border-radius: 20px;
    min-height: calc(100vh - 40px - 400px - 50px - 50px);
    /* overflow-y: auto; */
`;

const HomeTemplate = () => {
    const todoState = useTodoState();
    const todoItems = todoState.todoItem;
    const showList = todoItems.length > 0 ? true : false;

    return (
        <HomeTemplateBlock>
            <CalendarTemplate />
            <ListBlock>
                <TodoList />
            </ListBlock>
        </HomeTemplateBlock>
    );
};

export default HomeTemplate;
