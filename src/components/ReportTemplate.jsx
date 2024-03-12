import React from 'react';
import styled from 'styled-components';
import { useTodoState } from '../TodoContext';
import moment from 'moment';

const ReportTemplateBlock = styled.div`
    /* width: auto; */
    height: 100%;
    min-width: 1em;
    position: relative;
    background: white;
    border-radius: 16px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    margin: 10px 20px 10px;
    display: flex;
    flex-direction: column;

    padding-top: 24px;
    padding-left: 32px;
    padding-right: 32px;
    padding-bottom: 24px;

    h1 {
        text-align: center;
        margin: 0;
        font-size: 1.5em;
        color: #343a40;
    }
    .tasks-left {
        color: #6699ff;
        font-size: 1em;
        font-weight: bold;
    }

    div {
        margin-bottom: 10px;
    }
`;

function ReportTemplate({ children }) {
    const state = useTodoState();
    const todoItems = state.todoItem;
    const filteredList = todoItems.filter((todo) => moment(todo.date).isBetween(state.minDate, state.maxDate, undefined, '[]'));
    let sortedList = null;

    if (filteredList.length > 0) {
        sortedList = filteredList.sort(function (a, b) {
            return moment(b.date) - moment(a.date);
        });
    }
    const undoneTasks = sortedList ? sortedList.filter((todo) => !todo.completed) : '';
    return (
        <ReportTemplateBlock>
            <h1>SIMPLETODO 리포트</h1>
            <div className="tasks-left">n월 총 n개 중 n개 완료</div>
            <h3>오늘 할 일</h3>
            <div className="tasks-left">오늘 할 일이 총 {undoneTasks === '' ? '0' : undoneTasks}개 남았어요.</div>
            <h3>이번주 할 일</h3>
            <div className="tasks-left">이번주 할 일이 총 {undoneTasks === '' ? '0' : undoneTasks}개 남았어요.</div>
        </ReportTemplateBlock>
    );
}

export default ReportTemplate;
