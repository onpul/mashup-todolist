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
    font-weight: 900;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #6699ff;

    div {
        padding: 8px;
        background: #e9ecef;
        border-radius: 20px;
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
    }
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
            if (todoList.length < 1) {
                alert('해당 기간의 TODO가 없습니다.');
            } else {
                dispatch({
                    type: 'EDITCHECK',
                    id: todoList.map((key) => {
                        return key.id;
                    }),
                    checked: todoList.map((key) => {
                        return key.checked ? false : true;
                    }),
                });
            }
        } else {
            if (checkedList.length < 1) {
                alert('선택된 TODO가 없습니다.');
            } else if (window.confirm('총 ' + checkedList.length + '건의 TODO를 정말 삭제하시겠어요?'))
                dispatch({
                    type: 'DELETE',
                    id: checkedList.map((key) => {
                        return key.id;
                    }),
                });
            else {
                return;
            }
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
