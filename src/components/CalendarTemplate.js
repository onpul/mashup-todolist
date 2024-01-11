import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
// import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import { useTodoState, useTodoDate, useTodoDispatch } from '../TodoContext';
import moment from 'moment';

const CalendarTemplateBlock = styled.div`
    /* width: auto;
    height: auto; */
    min-width: 1em;
    position: relative;
    background: white;
    border-radius: 16px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);
    margin: 10px;
    align-items: center; // 컨텐츠 중앙 정렬
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
                type: 'SELECTDATE',
                selectedDate: sDate,
            },
            []
        );
    }

    const showState = todoData.showCalendar;
    console.log('>>> showState : ' + JSON.stringify(showState) + ' <<<');

    return (
        <>
            {showState && (
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
                                if (moment(date).format('dddd') === '토요일') {
                                    className.push('saturday');
                                } else if (
                                    moment(date).format('dddd') === '일요일'
                                ) {
                                    className.push('sunday');
                                } else if (
                                    dataMark.find(
                                        (x) =>
                                            x ===
                                            moment(date).format('YYYY-MM-DD')
                                    )
                                ) {
                                    className.push('highlight');
                                } else {
                                    className.push('weekday');
                                }
                                return className;
                            }}
                            tileContent={({ date, view }) => {
                                if (
                                    today === moment(date).format('YYYY-MM-DD')
                                ) {
                                    return (
                                        <>
                                            <abbr className="today">오늘</abbr>
                                        </>
                                    );
                                } else if (
                                    dataMark.find(
                                        (x) =>
                                            x ===
                                            moment(date).format('YYYY-MM-DD')
                                    )
                                ) {
                                    return (
                                        <>
                                            <p className="todo">●</p>
                                        </>
                                    );
                                }
                            }}
                            next2Label={null}
                            prev2Label={null}
                            shouldCloseOnSelect
                            minDate={new Date('2020-01-01')}
                            onChange={onChange}
                            value={value}
                        />
                    </CalendarTemplateBlock>
                </div>
            )}
        </>
    );
}

export default CalendarTemplate;
