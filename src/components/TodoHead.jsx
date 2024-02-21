import React from 'react';
import styled from 'styled-components';
import { useTodoDate, useTodoState } from '../TodoContext';
import moment from 'moment';
import 'moment/locale/ko';

const TodoHeadBlock = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
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
        margin-top: 20px;
        font-weight: bold;
    }
`;

const SetTodoBlock = styled.div`
    display: flex;
    justify-content: center;
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 50%;
    background: #6699ff;
    color: #ffffff;
    font-size: 1em;
    font-weight: 900;
    cursor: pointer;
    text-align: center;

    span {
        margin-top: auto;
        margin-bottom: auto;
    }
`;

const SettingMenuBlock = styled.div`
    width: 100%;
    position: absolute;
    z-index: 999;

    div {
        width: 150px;
        text-align: left;
        border-radius: 16px;
        padding: 5px 2px 5px 2px;
        margin-left: auto;
        margin-top: 85px;
        margin-right: 32px;
        background: gray;
        color: #ffffff;
        font-size: 0.8em;
        font-weight: 600;
    }

    ul {
        padding: 0;
        margin: 0;
        list-style: none;
        list-style-type: none;
    }

    li {
        padding: 0 8px;
        margin: 5px 0;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
    }

    hr {
        padding: 0;
        margin: 0;
        color: #fffff0;
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
            if (sortedList) {
                day = sortedList[0].date + ' ~ ' + sortedList[sortedList.length - 1].date;
            }
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
        <>
            <TodoHeadBlock>
                <div>
                    <h1>{title}</h1>
                    <div className="day">{day}</div>
                    <div className="tasks-left">{undoneTasks.length === 0 ? infoText_F : infoText_T}</div>
                </div>
                <div>
                    <SetTodoBlock>
                        <span>…</span>
                    </SetTodoBlock>
                </div>
            </TodoHeadBlock>
            <SettingMenuBlock>
                <div>
                    <ul>
                        <li>
                            <span>할 일 추가</span>
                            <span>+</span>
                        </li>
                        <hr />
                        <li>
                            <span>할 일 편집</span>
                            <span>e</span>
                        </li>
                        <hr />
                        <li>
                            <span>설정</span>
                            <span>s</span>
                        </li>
                    </ul>
                </div>
            </SettingMenuBlock>
        </>
    );
}

export default TodoHead;
