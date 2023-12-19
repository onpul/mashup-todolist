import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import { useTodoDate, useTodoDispatch } from '../TodoContext';
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
    const dispatch = useTodoDispatch();
    const todoDate = useTodoDate();
    const [value, setValue] = useState(new Date());
    function onChange(value) {
        setValue(value);
        const sDate = moment(value).format('YYYY-MM-DD');
        todoDate.current = sDate;
        dispatch(
            {
                type: 'SELECT',
                selectedDate: sDate,
            },
            []
        );
    }

    return (
        <div>
            <CalendarTemplateBlock>
                <Calendar onChange={onChange} value={value} />
            </CalendarTemplateBlock>
        </div>
    );
}

export default CalendarTemplate;
