import React from 'react';
import styled from 'styled-components';
// import {}, from 'react-icons/md';
import { useTodoDispatch, useTodoState, useTodoDate } from '../TodoContext';
import moment from 'moment';

const HeaderTemplateBlock = styled.div`
    width: auto;
    height: 40px;
    position: relative;
    background: white;
    border-radius: 16px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
    margin: 10px;
    display: flex;
    flex-direction: row;
    text-align: center;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    padding: 0 2px 0 2px;
`;

const StyledButton = styled.button`
    color: white;
    border: none;
    border-radius: 5px;
    height: 80%;
    width: auto;
    background: #ff3f01;
    margin: 2px;
    cursor: pointer;
`;

/**
 *
 * @param {*} param0
 * @returns
 *
 * 필터 템플릿(버튼) 필요한 거
 * 1. 달력버튼 / 전체보기 -> 우선
 * - 달력버튼 눌렀을 때 달력 노출되도록 구현해보기(디폴트는 해당일의 투두임)
 */
function HeaderTemplate({ children }) {
    const state = useTodoState();
    const dispatch = useTodoDispatch();
    const todoDate = useTodoDate();

    const showState = state.showCalendar ? '달력숨기기' : '달력보기';
    function toggleCalendar() {
        if (state.showCalendar) {
            dispatch(
                {
                    type: 'SHOWCALENDAR',
                    showCalendar: false,
                },
                []
            );
        } else {
            todoDate.current = moment().format('YYYY-MM-DD');
            dispatch(
                {
                    type: 'SHOWCALENDAR',
                    showCalendar: true,
                    selectedDate: moment().format('YYYY-MM-DD'),
                },
                []
            );
        }
    }
    function showTotalTodo() {
        todoDate.current = null;
        dispatch(
            {
                type: 'SELECTDATE',
                selectedDate: '전체보기',
            },
            []
        );
    }
    return (
        <div>
            <HeaderTemplateBlock>
                <StyledButton onClick={toggleCalendar}>
                    {showState}
                </StyledButton>
                <StyledButton onClick={showTotalTodo}>전체보기</StyledButton>
            </HeaderTemplateBlock>
        </div>
    );
}

export default HeaderTemplate;
