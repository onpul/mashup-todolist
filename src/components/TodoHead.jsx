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
        color: #6699ff;
        font-size: 1em;
        margin-top: 40px;
        font-weight: bold;
    }
`;

function TodoHead() {
    const todoDate = useTodoDate();
    const state = useTodoState();
    const todoItems = state.todoItem;
    let title = null;
    let day = null;
    const selDate = moment(todoDate.current);
    const sYear = moment(state.minDate).year(); // 년
    const sMonth = moment(state.minDate).month() + 1; // 월
    const weekOfMonth = (m) => m.week() - moment(m).startOf('month').week() + 1; // 주차

    const filteredList = todoItems.filter((todo) => moment(todo.date).isBetween(state.minDate, state.maxDate, undefined, '[]'));
    let sortedList = null;

    if (filteredList.length > 0) {
        sortedList = filteredList.sort(function (a, b) {
            return moment(b.date) - moment(a.date);
        });
    }

    switch (state.option) {
        case 'all':
            title = '전체보기';
            day = sortedList[0].date + ' ~ ' + sortedList[sortedList.length - 1].date;
            break;
        case 'day':
            title = '일별보기';
            day = selDate.format('LL');
            break;
        case 'month':
            title = '월별보기';
            day = sYear + '년 ' + sMonth + '월';
            break;
        case 'week':
            title = '주간보기';
            day = sMonth + '월 ' + weekOfMonth(moment(state.minDate)) + '주차';
            break;
        default:
            title = '일별보기';
            day = selDate.format('LL');
            break;
    }

    const undoneTasks = sortedList ? sortedList.filter((todo) => !todo.completed) : '';
    const infoText_T = '할 일 ' + undoneTasks.length + '개 남음';
    const infoText_F = '예정된 일정이 없습니다.';

    return (
        <TodoHeadBlock>
            <h1>{title}</h1>
            <div className="day">{day}</div>
            <div className="tasks-left">{undoneTasks.length === 0 ? infoText_F : infoText_T}</div>
        </TodoHeadBlock>
    );
}

export default TodoHead;
