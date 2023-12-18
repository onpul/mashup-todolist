import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import { useTodoDate, useTodoDispatch, useTodoState } from '../TodoContext';
import moment from 'moment';

const CalendarTemplateBlock = styled.div`
    width: 512px;
    height: auto;

    position: relative;
    background: white;
    border-radius: 16px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);

    margin: 0 auto; // 페이지 중앙 정렬

    margin-top: 96px;
    margin-bottom: 32px;
    display: flex;
    flex-direction: column;
`;

function CalendarTemplate({ children }) {
    /**
        const [value, onChange] = useState(new Date());

        return (
            <div>
            <Calendar onChange={onChange} value={value} />
            </div>
        );
     */
    const dispatch = useTodoDispatch();
    const todoDate = useTodoDate();
    const todoList = useTodoState();
    const [value, setValue] = useState(new Date());
    function onChange(value) {
        // console.log('>>> CalendarTemplate.js 에서 onChange 호출 확인 <<<');
        setValue(value);
        // console.log('value : ' + value);
        const sDate = moment(value).format('YYYY-MM-DD');
        // console.log('sDate : ' + sDate);
        todoDate.current = sDate;
        dispatch(
            {
                type: 'SELECT',
                selectedDate: sDate,
            },
            []
        );
        console.log('todoDate : ' + todoDate.current);
    }

    return (
        <div>
            <CalendarTemplateBlock>
                <Calendar onChange={onChange} value={value} />
                <div>
                    <h3>테스트 필드</h3>
                    <ul>
                        <li>
                            선택한 날짜:{' '}
                            {moment(value).format('YYYY-MM-DD').toString()}
                        </li>
                        <li>원본 리스트: {JSON.stringify(todoList.todos)}</li>
                    </ul>
                </div>
            </CalendarTemplateBlock>
        </div>
    );
}

export default CalendarTemplate;
