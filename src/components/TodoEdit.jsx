import React from 'react';
import styled from 'styled-components';
import { useTodoState } from '../TodoContext';

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
    return (
        <>
            {state.showEditMode ? (
                <TodoEditBlock>
                    <ButtonBlock>
                        <div>전체선택</div>
                        <div>삭제</div>
                    </ButtonBlock>
                </TodoEditBlock>
            ) : (
                <></>
            )}
        </>
    );
}

export default TodoEdit;
