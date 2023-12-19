import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import './Calendar.css';
import { useTodoState, useTodoDate, useTodoDispatch } from '../TodoContext';
import moment from 'moment';

const CalendarTemplateBlock = styled.div`
    width: 512px;
    height: auto;

    position: relative;
    background: white;
    border-radius: 16px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);

    margin: 0 auto; // 페이지 중앙 정렬

    align-items: center; // 컨텐츠 중앙 정렬

    margin-top: 96px;
    margin-bottom: 32px;
    display: flex;
    flex-direction: column;
`;

function CalendarTemplate({ children }) {
    const todoData = useTodoState();
    const dispatch = useTodoDispatch();
    const todoDate = useTodoDate();
    const [value, setValue] = useState(new Date());
    const dataMark = todoData.todoItem.map((todo) => todo.date); // todo 데이터가 있는 날짜 스타일 적용
    const today = moment().format('YYYY-MM-DD');
    function onChange(value) {
        console.log('>>> dataMark : ' + JSON.stringify(dataMark) + ' <<<');
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
                <Calendar
                    locale="ko"
                    formatDay={(locale, date) =>
                        date.toLocaleString('en', { day: 'numeric' })
                    }
                    calendarType="gregory"
                    tileClassName={({ date, view }) => {
                        const className = [];
                        if (
                            dataMark.find(
                                (x) => x === moment(date).format('YYYY-MM-DD')
                            )
                        ) {
                            className.push('highlight');
                        }
                        return className;
                    }}
                    tileContent={({ date, view }) => {
                        if (today === moment(date).format('YYYY-MM-DD')) {
                            return (
                                <>
                                    <abbr className="today">today</abbr>
                                </>
                            );
                        } else if (
                            dataMark.find(
                                (x) => x === moment(date).format('YYYY-MM-DD')
                            )
                        ) {
                            return (
                                <>
                                    <abbr className="todo">!TODO</abbr>
                                </>
                            );
                        } else {
                            return (
                                <>
                                    <abbr className=""> </abbr>
                                </>
                            );
                        }
                    }}
                    onChange={onChange}
                    value={value}
                />
            </CalendarTemplateBlock>
        </div>
    );
}

export default CalendarTemplate;
