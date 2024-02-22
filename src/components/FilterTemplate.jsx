import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useTodoDispatch, useTodoState, useTodoDate } from '../TodoContext';
import moment from 'moment';

const FilterTemplateBlock = styled.div`
    width: auto;
    height: 40px;
    position: relative;
    background: white;
    border-radius: 16px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    margin: 10px 20px 10px;
    padding: 0 12px 0 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;

    .btnGroup {
        height: 100%;
        display: flex;
        flex-direction: row;
        text-align: center;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
    }
`;

const StyledButton = styled.button`
    color: #000000;
    border: none;
    border-radius: 7px;
    height: 60%;
    width: auto;
    background: none;
    margin: 2px;
    cursor: pointer;
    font-weight: 600;
`;

const StyledRadioBox = styled.fieldset`
    height: 100%;
    display: flex;
    flex-direction: row;
    text-align: center;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    color: #000000;
    font-size: 12px;
    line-height: 12px;
    border: none;
    border-radius: 7px;
    width: auto;
    background: none;

    cursor: pointer;

    input[type='radio'] {
        display: none;
        margin: 10px;
    }
    input[type='radio'] + label {
        display: inline-block;
        margin: 2px;
    }
    input[type='radio']:checked + label {
        color: #6699ff;
        font-weight: bolder;
        text-decoration: underline;
    }
`;

/**
 *
 * @param {*} param0
 * @returns
 */
function FilterTemplate({ children }) {
    const state = useTodoState();
    const dispatch = useTodoDispatch();
    const todoDate = useTodoDate();

    /**
     * 기간별 일정 보기
     */
    function showTotalTodo(type) {
        const todoList = state.todoItem;
        const sortList = todoList.sort((a, b) => {
            return moment(a.date) - moment(b.date);
        });
        const minDate = sortList[0].date;
        const maxDate = sortList[sortList.length - 1].date;
        if (type === 'all') {
            // 전체보기
            dispatch(
                {
                    type: 'SELECTDATE',
                    minDate: minDate,
                    maxDate: maxDate,
                    option: type,
                },
                []
            );
        } else if (type === 'day') {
            // 일별보기
            dispatch(
                {
                    type: 'SELECTDATE',
                    minDate: todoDate.current,
                    maxDate: todoDate.current,
                    option: type,
                },
                []
            );
        } else if (type === 'month') {
            // 월별보기
            dispatch(
                {
                    type: 'SELECTDATE',
                    minDate: moment(todoDate.current).startOf('month').format('YYYY-MM-DD'),
                    maxDate: moment(todoDate.current).endOf('month').format('YYYY-MM-DD'),
                    option: type,
                },
                []
            );
        } else if (type === 'week') {
            // 주간보기
            dispatch(
                {
                    type: 'SELECTDATE',
                    minDate: todoDate.current,
                    maxDate: todoDate.current,
                    option: type,
                },
                []
            );
        }
    }

    function fncRadioState(e) {
        // console.log(e.target.id);
        // console.log(e.target.checked);
        const clickedID = e.target.id;
        showTotalTodo(clickedID);
    }

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
                },
                []
            );
        }
    }

    return (
        <>
            <FilterTemplateBlock>
                <StyledRadioBox>
                    <div>
                        <input type="radio" id="all" name="filter" onChange={fncRadioState} />
                        <label htmlFor="all">전체</label>
                    </div>
                    <div>
                        <input type="radio" id="day" name="filter" onChange={fncRadioState} defaultChecked />
                        <label htmlFor="day">일별</label>
                    </div>
                    <div>
                        <input type="radio" id="month" name="filter" onChange={fncRadioState} />
                        <label htmlFor="month">월별</label>
                    </div>
                    <div>
                        <input type="radio" id="week" name="filter" onChange={fncRadioState} />
                        <label htmlFor="week">주간</label>
                    </div>
                </StyledRadioBox>
                <StyledButton onClick={toggleCalendar}>{showState}</StyledButton>
            </FilterTemplateBlock>
        </>
    );
}

export default FilterTemplate;
