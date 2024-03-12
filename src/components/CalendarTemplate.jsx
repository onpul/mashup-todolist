import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
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
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    margin: 10px 20px 20px;
    align-items: center; // 컨텐츠 중앙 정렬
    display: flex;
    flex-direction: column;
`;

const ButtonToday = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 25px;
    margin-top: 10px;
    margin-right: 70px;
    margin-left: 100%;
    text-align: center;
    border-radius: 12px;
    font-size: 0.8em;
    line-height: 0.8em;
    font-weight: 800;
    background-color: #6699ff;
    color: #ffffff;
    border: 0;
`;

function CalendarTemplate({ children }) {
    const todoData = useTodoState();
    const dispatch = useTodoDispatch();
    const todoDate = useTodoDate();
    const [value, setValue] = useState(new Date());
    const dataMark = todoData.todoItem.map((todo) => todo.date); // todo 데이터가 있는 날짜 스타일 적용
    const today = moment().format('YYYY-MM-DD');
    function onChange(value) {
        setValue(value);
        const sDate = moment(value).format('YYYY-MM-DD');
        todoDate.current = sDate;
        dispatch(
            {
                type: 'SELECTDATE',
                minDate: sDate,
                maxDate: sDate,
                option: todoData.option,
            },
            []
        );
    }

    const [activeStartDate, setActiveStartDate] = useState(new Date());
    function handleTodayClick() {
        const today = new Date();
        setActiveStartDate(today);
        setValue(today);
    }

    const showState = todoData.showCalendar;
    const filterOpt = todoData.option;
    const sMonth = moment(value).month() + 1; // 월
    const weekOfMonth = (m) => m.week() - moment(m).startOf('month').week() + 1; // 주차

    let navigationTitle = null;

    function fncSetCalendarOpt(option, date) {
        // console.log(value);
        // console.log(option);
        // console.log(filterOpt);

        if (option === 'navigationLabel') {
            switch (filterOpt) {
                case 'day':
                    navigationTitle = moment(value).format('YYYY년 M월 D일');
                    break;
                case 'month':
                    navigationTitle = moment(value).format('YYYY년 M월');
                    break;
                case 'week':
                    navigationTitle = sMonth + '월 ' + weekOfMonth(moment(value)) + '주차';
                    break;
                default:
                    break;
            }
            return navigationTitle;
        } else if (option === 'tileClassName') {
            const className = [];
            if (moment(date).format('dddd') === '토요일') {
                className.push('saturday');
            } else if (moment(date).format('dddd') === '일요일') {
                className.push('sunday');
            } else if (dataMark.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
                className.push('highlight');
            } else {
                className.push('weekday');
            }
            return className;
        } else if (option === 'tileContent') {
            if (today === moment(date).format('YYYY-MM-DD')) {
                return (
                    <>
                        <abbr className="today">오늘</abbr>
                    </>
                );
            } else if (dataMark.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
                let count = 0;
                dataMark.forEach((val) => {
                    val === moment(date).format('YYYY-MM-DD') ? (count += 1) : (count += 0);
                });
                // console.log(count);
                return (
                    <>
                        <div className="todoDiv">
                            <p className="todo">{/* <span>{count}</span> */}</p>
                        </div>
                    </>
                );
            }
        }
    }

    return (
        <>
            {showState && (
                <div>
                    <CalendarTemplateBlock>
                        <Calendar
                            locale="ko"
                            formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })}
                            calendarType="gregory"
                            view={'month'}
                            nextLabel={'>'}
                            prevLabel={'<'}
                            next2Label={null}
                            prev2Label={null}
                            minDate={new Date('2020-01-01')}
                            onChange={onChange}
                            value={value}
                            // navigationLabel={() => {
                            //     return fncSetCalendarOpt('navigationLabel');
                            // }}
                            tileClassName={({ date }) => {
                                return fncSetCalendarOpt('tileClassName', date);
                            }}
                            tileContent={({ date }) => {
                                return fncSetCalendarOpt('tileContent', date);
                            }}
                            // 오늘 날짜로 돌아오는 기능을 위해 필요한 옵션 설정
                            activeStartDate={activeStartDate}
                            onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}
                        />
                        <ButtonToday onClick={handleTodayClick}>오늘</ButtonToday>
                    </CalendarTemplateBlock>
                </div>
            )}
        </>
    );
}

export default CalendarTemplate;
