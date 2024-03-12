import React, { useState } from 'react';
import styled from 'styled-components';
import { useTodoDispatch, useTodoState } from '../TodoContext';
import moment from 'moment';

const TodoEditBlock = styled.div`
    font-size: 0.85em;
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
    justify-content: space-evenly;
    align-items: center;
    color: #6699ff;

    div {
        padding: 6px 8px;
        width: auto;
        background: #e9ecef;
        border-radius: 20px;
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
    }

    #all {
        color: #ff6b6b;
    }
`;

function TodoEdit() {
    const state = useTodoState();
    const dispatch = useTodoDispatch();
    const [checkedText, setCheckedText] = useState('전체선택');
    const onclick = (e) => {
        const todoList = state.todoItem;
        const filteredList = todoList.filter((todo) => moment(todo.date).isBetween(state.minDate, state.maxDate, undefined, '[]'));
        const checkedList = filteredList.filter((todo) => todo.checked);

        console.log(todoList);
        if (e.target.id === 'all') {
            // 해당 뷰의 리스트 id 를 가져와야 함
            if (filteredList.length < 1) {
                alert('해당 기간의 TODO가 없습니다.');
            } else {
                dispatch({
                    type: 'AllCHECKTOGGLE',
                    id: todoList.map((key) => {
                        return key.id;
                    }),
                    // 체크 여부는 reducer 내에서 처리
                    // allChecked: !state.allChecked,
                });
                setCheckedText(state.allChecked ? '전체선택' : '전체해제');
            }
        } else if (e.target.id === 'done') {
            dispatch({
                type: 'ALLDONE',
                id: todoList.map((key) => {
                    return key.id;
                }),
            });
        } else if (e.target.id === 'yet') {
            dispatch({
                type: 'ALLYET',
                id: todoList.map((key) => {
                    return key.id;
                }),
            });
        } else if (e.target.id === 'delete') {
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
                            {checkedText}
                        </div>
                        <span>|</span>
                        <div id="done" onClick={onclick}>
                            완료
                        </div>
                        <div id="yet" onClick={onclick}>
                            미완료
                        </div>
                        <div id="delete" onClick={onclick}>
                            삭제
                        </div>
                    </ButtonBlock>
                </TodoEditBlock>
            ) : (
                <></>
            )}
        </>
    );
}

export default TodoEdit;
