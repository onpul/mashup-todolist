import React from 'react';
import styled from 'styled-components';
import { useTodoDate, useTodoState } from '../TodoContext';
import moment from 'moment';
import 'moment/locale/ko';

const TodoHeadBlock = styled.div`
    padding-top: 48px;
    padding-left: 32px;
    padding-right: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid #e9ecef;
    h1 {
        margin: 0;
        font-size: 36px;
        color: #343a40;
    }
    .day {
        margin-top: 4px;
        color: #868e96;
        font-size: 21px;
    }
    .tasks-left {
        color: #20c997;
        font-size: 18px;
        margin-top: 40px;
        font-weight: bold;
    }
`;

function TodoHead() {
    const todoDate = useTodoDate();
    const state = useTodoState();
    const todoItems = state.todoItem;
    const filteredItems = todoItems.filter(
        (todo) => todo.date === todoDate.current
    );

    const undoneTasks = filteredItems.filter((todo) => !todo.completed);
    return (
        <TodoHeadBlock>
            <h1>{moment(todoDate.current).format('LL')}</h1>
            <div className="day">{moment(todoDate.current).format('dddd')}</div>
            <div className="tasks-left">할 일 {undoneTasks.length}개 남음</div>
        </TodoHeadBlock>
    );
}

export default TodoHead;
