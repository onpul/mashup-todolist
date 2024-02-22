import React, { useState } from 'react';
import styled from 'styled-components';
import { useTodoDispatch, useTodoState } from '../TodoContext';

const TodoEditBlock = styled.div`
    font-size: 1em;
    line-height: 1em;
    box-sizing: border-box;
    margin-bottom: -20px;
    width: 100%;
    top: 192px;
    position: static;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 32px;
    padding-right: 32px;
    padding-top: 5px;
    padding-bottom: 5px;
    height: 75px;
`;

const ButtonBlock = styled.div`
    font-weight: 600;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ff6b6b;
`;

function TodoEdit() {
    const state = useTodoState();
    const dispatch = useTodoDispatch();
    const onclick = (e) => {
        let todoList = state.todoItem;
        let checkedList = state.todoItem.filter((todo) => todo.checked);

        console.log(todoList);
        if (e.target.id === 'all') {
            // 해당 뷰의 리스트 id 를 가져와야 함
            dispatch({
                type: 'EDITCHECK',
                id: todoList.map((key) => {
                    return key.id;
                }),
                checked: todoList.map((key) => {
                    return key.checked ? false : true;
                }),
            });
        } else {
            dispatch({
                type: 'DELETE',
                id: checkedList.map((key) => {
                    return key.id;
                }),
            });
        }
    };
    return (
        <>
            {state.showEditMode ? (
                <TodoEditBlock>
                    <ButtonBlock>
                        <div id="all" onClick={onclick}>
                            전체선택
                        </div>
                        <div onClick={onclick}>삭제</div>
                    </ButtonBlock>
                </TodoEditBlock>
            ) : (
                <></>
            )}
        </>
    );
}

export default TodoEdit;
