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
        font-size: 1.5em;
        color: #343a40;
    }
    .day {
        margin-top: 4px;
        color: #868e96;
        font-size: 1.2em;
    }
    .tasks-left {
        color: #ff3f01;
        font-size: 1em;
        margin-top: 40px;
        font-weight: bold;
    }
`;

function TodoHead() {
    const todoDate = useTodoDate();
    const state = useTodoState();
    const todoItems = state.todoItem;
    let filteredList = null;
    let title = null;
    let day = null;
    if (todoDate.current !== null) {
        filteredList = todoItems.filter(
            (todo) => todo.date === todoDate.current
        );
        title = moment(todoDate.current).format('LL');
        day = moment(todoDate.current).format('dddd');
    } else if (todoDate.current === null) {
        filteredList = todoItems;
        console.log(JSON.stringify(filteredList));
        title = '전체보기';
        var sort = filteredList.sort(function (a, b) {
            return b.date - a.date;
        });
        day = sort[0].date + ' ~ ' + sort[sort.length - 1].date;
    }

    const undoneTasks = filteredList.filter((todo) => !todo.completed);
    return (
        <TodoHeadBlock>
            <h1>{title}</h1>
            <div className="day">{day}</div>
            <div className="tasks-left">할 일 {undoneTasks.length}개 남음</div>
        </TodoHeadBlock>
    );
}

export default TodoHead;
