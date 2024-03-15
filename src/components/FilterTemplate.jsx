import React from 'react';
import styled from 'styled-components';
import { useTodoDispatch, useTodoState, useTodoDate, useShowState, useShowDispatch } from '../TodoContext';
import moment from 'moment';

const FilterTemplateBlock = styled.div`
    min-height: 40px;
    position: relative;
    background: white;
    border-radius: 16px;
    /* box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3); */
    /* margin: 10px 20px 10px; */
    margin-top: 10px;
    padding: 0 12px;
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

const StyledRadioBox = styled.fieldset`
    z-index: 999;
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

    const showState = useShowState();
    const showDispatch = useShowDispatch();
    function fncRadioState(e) {
        debugger;
        // console.log(e.target.id);
        // console.log(e.target.checked);
        const clickedID = e.target.id;
        // showTotalTodo(clickedID);

        if (clickedID === 'main') {
            showDispatch(
                {
                    type: 'SHOWORHIDE',
                    showCalendar: false,
                    showForm: false,
                    showSetting: false,
                    showEditMode: false,
                    showTodoList: false,
                    showReport: true,
                },
                []
            );
        } else if (clickedID === 'calendar') {
            showDispatch(
                {
                    type: 'SHOWORHIDE',
                    showCalendar: true,
                    showForm: false,
                    showSetting: false,
                    showEditMode: false,
                    showTodoList: false,
                    showReport: false,
                },
                []
            );
        } else if (clickedID === 'todolist') {
            showDispatch(
                {
                    type: 'SHOWORHIDE',
                    showCalendar: false,
                    showForm: false,
                    showSetting: false,
                    showEditMode: false,
                    showTodoList: true,
                    showReport: false,
                },
                []
            );
        } else if (clickedID === 'add') {
            showDispatch(
                {
                    type: 'SHOWORHIDE',
                    showCalendar: false,
                    showForm: true,
                    showSetting: false,
                    showEditMode: false,
                    showTodoList: false,
                    showReport: false,
                },
                []
            );
        }
    }

    // const showState = state.showCalendar ? '달력숨기기' : '달력보기';
    // function toggleCalendar() {
    //     if (showState === '달력보기') {
    //         showDispatch(
    //             {
    //                 type: 'SHOWORHIDE',
    //                 showCalendar: true,
    //             },
    //             []
    //         );
    //     } else {
    //         todoDate.current = moment().format('YYYY-MM-DD');
    //         showDispatch(
    //             {
    //                 type: 'SHOWORHIDE',
    //                 showCalendar: false,
    //             },
    //             []
    //         );
    //     }
    // }

    return (
        <>
            <FilterTemplateBlock>
                <StyledRadioBox>
                    <div>
                        <input type="radio" id="main" name="filter" onChange={fncRadioState} defaultChecked />
                        <label htmlFor="main">메인</label>
                    </div>
                    <div>
                        <input type="radio" id="calendar" name="filter" onChange={fncRadioState} />
                        <label htmlFor="calendar">달력</label>
                    </div>
                    <div>
                        <input type="radio" id="todolist" name="filter" onChange={fncRadioState} />
                        <label htmlFor="todolist">일정</label>
                    </div>
                    <div>
                        <input type="radio" id="add" name="filter" onChange={fncRadioState} />
                        <label htmlFor="add">추가</label>
                    </div>
                </StyledRadioBox>
            </FilterTemplateBlock>
        </>
    );
}

export default FilterTemplate;
