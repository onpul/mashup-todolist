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
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
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
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    border-radius: 20px;
`;

const HomeTemplate = () => {
    const todoState = useTodoState();
    const showDispatch = useShowDispatch();
    const todoItems = todoState.todoItem;
    const [list, setList] = useState(null);
    const fncButtonAction = (e) => {
        const type = e.target.id || '';
        switch (type) {
            case 'today':
                setList(todoItems.filter((todo) => moment(todo.date).isBetween(moment(), moment(), undefined, '[]') && !todo.completed));
                break;
            case 'detail':
                showDispatch(
                    {
                        type: 'SHOWORHIDE',
                        showCalendar: false,
                        showForm: false,
                        showSetting: false,
                        showEditMode: false,
                        showTodoList: true,
                        showReport: false,
                        showHome: false,
                    },
                    []
                );
                break;

            default:
                break;
        }
    };

    return (
        <HomeTemplateBlock>
            <CalendarTemplate />
            <ListBlock>
                <TodoList list={list} />
            </ListBlock>
        </HomeTemplateBlock>
    );
};

export default HomeTemplate;
