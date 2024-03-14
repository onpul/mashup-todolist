import React from 'react';
import styled from 'styled-components';
import { useTodoState } from '../TodoContext';
import moment from 'moment';
import TodoList from '../components/TodoList';

const ReportTemplateBlock = styled.div`
    box-sizing: border-box;
    position: relative;
    background: #ffffff;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    /* min-height: calc(100% - 40px - 40px - 60px); */
    max-height: calc(100vh - 40px - 50px - 50px - 50px);
    overflow-y: auto;

    .todoTitle {
        padding-left: 32px;
        padding-right: 32px;
    }

    .type {
        background-color: #ffb56b;
    }

    .detail {
        font-size: 0.5em;
    }

    .tasks-left {
        color: #ff6b6b;
        text-decoration: underline;
        font-size: 1.5em;
        font-weight: 900;
        margin-top: 0.5em;
        /* margin-bottom: 0.5em; */
    }
`;

const ReportHeaderBlock = styled.div`
    text-align: center;
    font-size: 1.2em;
    padding-top: 30px;
    padding-bottom: 30px;
    padding-left: 32px;
    padding-right: 32px;
    /* border-bottom: 1px solid #e9ecef; */
`;

const ReportContentBlock = styled.div``;

function ReportTemplate() {
    const state = useTodoState();
    const todoItems = state.todoItem;
    const fncReturnTodo = (type) => {
        // debugger;
        const sMinDate = moment(type === 'today' ? moment() : type === 'week' ? moment().startOf('week') : moment().startOf('month')).format('YYYY-MM-DD');
        const sMaxDate = moment(type === 'today' ? moment() : type === 'week' ? moment().endOf('week') : moment().endOf('month')).format('YYYY-MM-DD');
        return todoItems.filter((todo) => moment(todo.date).isBetween(sMinDate, sMaxDate, undefined, '[]') && !todo.completed);
    };

    return (
        <ReportTemplateBlock>
            {/* <ReportHeaderBlock>
                <h1>{moment().format('YYYY년 MM월 DD일 dddd')}</h1>
            </ReportHeaderBlock> */}
            <ReportContentBlock>
                <h3 className="todoTitle">
                    <span className="type">오늘</span> 할 일이 <span className="tasks-left">{fncReturnTodo('today').length}</span>개 남았어요.
                </h3>
                <TodoList list={fncReturnTodo('today')}>어쩌구</TodoList>
            </ReportContentBlock>
            <ReportContentBlock>
                <h3 className="todoTitle">
                    <span className="type">이번주</span> 할 일이 <span className="tasks-left">{fncReturnTodo('week').length}</span>개 남았어요.
                </h3>
                <TodoList list={fncReturnTodo('week')}>어쩌구</TodoList>
            </ReportContentBlock>
            <ReportContentBlock>
                <h3 className="todoTitle">
                    <span className="type">이번달</span> 할 일이 <span className="tasks-left">{fncReturnTodo('month').length}</span>개 남았어요.
                </h3>
                <TodoList list={fncReturnTodo('week')}>어쩌구</TodoList>
            </ReportContentBlock>
        </ReportTemplateBlock>
    );
}

export default ReportTemplate;
