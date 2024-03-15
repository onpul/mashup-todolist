import React from 'react';
import { styled, css } from 'styled-components';
import { useShowDispatch, useTodoState } from '../TodoContext';
import TodoItem from './TodoItem';
import moment from 'moment';

const TodoListBlock = styled.div`
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    ${(props) =>
        props.$margin &&
        css`
            min-height: 400px;
            padding-bottom: 48px;
        `}
`;

const NoDataBlock = styled.div`
    /* padding-top: 10px; */
    width: 100%;
    /* height: calc(100vh - 40px - 400px - 50px - 50px); */
    min-height: calc(100vh - 40px - 400px - 50px - 50px);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    span {
        font-size: 1em;
        font-weight: 700;
    }
`;

const ButtonBlock = styled.div`
    font-weight: 900;
    width: 250px;
    margin-left: auto;
    margin-right: auto;
    height: 50px;
    border-radius: 16px;
    cursor: pointer;
    display: flex;
    margin-top: 10px;
    justify-content: space-evenly;
    align-items: center;
    background: #e9ecef;
    color: #ff6b6b;
`;

function TodoList({ list, margin }) {
    const state = useTodoState();
    const todoList = state.todoItem;
    const filteredList = list ? list : todoList.filter((todo) => moment(todo.date).isBetween(state.minDate, state.maxDate, undefined, '[]'));
    const showDispatch = useShowDispatch();
    const onclick = () => {
        showDispatch(
            {
                type: 'SHOWORHIDE',
                showCalendar: false,
                showForm: true,
                showSetting: false,
                showEditMode: false,
                showTodoList: false,
                showReport: false,
                showHome: false,
            },
            []
        );
    };

    return (
        <TodoListBlock $list={list} $margin={margin}>
            {filteredList.length > 0 ? (
                filteredList.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        id={todo.id}
                        text={todo.content}
                        date={todo.date}
                        done={todo.completed} // boolean 타입
                        checked={todo.checked}
                    />
                ))
            ) : (
                <NoDataBlock>
                    <span>해당 날짜의 일정이 없습니다.</span>
                    <ButtonBlock onClick={onclick}>일정 등록하기</ButtonBlock>
                </NoDataBlock>
            )}
        </TodoListBlock>
    );
}

export default TodoList;
