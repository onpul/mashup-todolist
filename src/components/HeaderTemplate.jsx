import React from 'react';
import styled from 'styled-components';
// import {}, from 'react-icons/md';
import { useTodoDispatch, useTodoState, useTodoDate } from '../TodoContext';
import moment from 'moment';

const HeaderTemplateBlock = styled.div`
    width: auto;
    height: 40px;
    margin: 20px 20px 10px;
    position: relative;
    background: #6699ff;
    border-radius: 16px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
    padding: 0 12px 0 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .btnGroup {
        height: 100%;
        display: flex;
        flex-direction: row;
        text-align: center;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
    }
    .logo {
        color: #ffffff;
        font-weight: 900;
    }
`;

const StyledButton = styled.button`
    color: #ffffff;
    border: none;
    border-radius: 7px;
    height: 60%;
    width: auto;
    background: none;
    margin: 2px;
    cursor: pointer;
`;

/**
 *
 * @param {*} param0
 * @returns
 */
function HeaderTemplate({ children }) {
    const state = useTodoState();
    const dispatch = useTodoDispatch();
    const todoDate = useTodoDate();

    // const showState = state.showCalendar ? '달력' : '달력';
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
                    minDate: moment().format('YYYY-MM-DD'),
                    maxDate: moment().format('YYYY-MM-DD'),
                },
                []
            );
        }
    }

    function showTotalTodo() {
        toggleCalendar(); // 전체보기 누르면 달력은 숨기기
        todoDate.current = null;
        // dispatch(
        //     {
        //         type: 'SELECTDATE',
        //         selectedDate: '전체보기',
        //     },
        //     []
        // );
    }
    return (
        <HeaderTemplateBlock>
            <div className="logo">LETSDOIT</div>
            <div className="btnGroup">
                {/* <StyledButton onClick={toggleCalendar}>{showState}</StyledButton> */}
                <StyledButton onClick={showTotalTodo}>설정</StyledButton>
            </div>
        </HeaderTemplateBlock>
    );
}

export default HeaderTemplate;
