import React, { useRef, createContext, useContext, useReducer } from 'react';
import moment from 'moment';

const todayDate = moment().format('YYYY-MM-DD');
const todoListData = {
    minDate: todayDate,
    maxDate: todayDate,
    showCalendar: true,
    todoItem: [
        {
            userId: 'onpul',
            date: '2024-01-11',
            id: 1,
            content: '투두 리스트 어쩌구',
            completed: false,
        },
        {
            userId: 'onpul',
            date: '2024-01-12',
            id: 2,
            content: '투두 더미데이터 어쩌구',
            completed: true,
        },
        {
            userId: 'onpul',
            date: '2024-01-13',
            id: 3,
            content: '맛있는 거 먹기 어쩌구',
            completed: false,
        },
        {
            userId: 'onpul',
            date: '2024-01-13',
            id: 4,
            content: '집에 가고싶다 어쩌구',
            completed: true,
        },
        {
            userId: 'onpul',
            date: '2024-01-13',
            id: 5,
            content: '어쩌구 저쩌구',
            completed: true,
        },
        {
            userId: 'onpul',
            date: '2024-01-13',
            id: 6,
            content: '어쩌구 저쩌구 어쩌구 저쩌구',
            completed: true,
        },
        {
            userId: 'onpul',
            date: '2024-01-13',
            id: 7,
            content: '어쩌구 저쩌구 어쩌구 저쩌구',
            completed: true,
        },
        {
            userId: 'onpul',
            date: '2024-01-13',
            id: 8,
            content: '어쩌구 저쩌구 어쩌구 저쩌구',
            completed: true,
        },
        {
            userId: 'onpul',
            date: '2024-01-11',
            id: 9,
            content: '어쩌구 저쩌구 어쩌구 저쩌구',
            completed: true,
        },
        {
            userId: 'onpul',
            date: '2024-01-11',
            id: 10,
            content: '가습기 세척하기',
            completed: true,
        },
        {
            userId: 'onpul',
            date: '2024-01-11',
            id: 11,
            content: '쓰레기통 비우기',
            completed: false,
        },
        {
            userId: 'onpul',
            date: '2024-01-11',
            id: 12,
            content: '마우스, 키보드 전원 끄기',
            completed: false,
        },
        {
            userId: 'onpul',
            date: '2023-12-18',
            id: 13,
            content: '리액트 운영 배포 확인하기',
            completed: false,
        },
        {
            userId: 'onpul',
            date: '2023-12-15',
            id: 14,
            content: '연차 일정 확인하기',
            completed: true,
        },
        {
            userId: 'onpul',
            date: '2023-12-15',
            id: 15,
            content: '연차 일정 확인하기',
            completed: true,
        },
    ],
};

function todoReducer(state, action) {
    console.log('>>여기는 todoReducer<<');
    console.log('state = ' + JSON.stringify(state));
    console.log('action = ' + JSON.stringify(action));
    switch (action.type) {
        case 'CREATE':
            return { ...state, todoItem: state.todoItem.concat(action.todo) };
        case 'DELETE':
            return {
                ...state,
                todoItem: state.todoItem.filter((todo) => todo.id !== action.id),
            };
        case 'TOGGLE':
            return {
                ...state,
                todoItem: state.todoItem.map((todo) => (todo.id === action.id ? { ...todo, completed: !todo.completed } : todo)),
            };
        case 'SELECTDATE':
            return { ...state, minDate: action.minDate, maxDate: action.maxDate };
        case 'SHOWCALENDAR':
            return {
                ...state,
                showCalendar: action.showCalendar,
                minDate: action.minDate,
                maxDate: action.maxDate,
            };
        default:
            return state;
    }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();
const TodoDateContext = createContext();
const CalendarShowContext = createContext();

/**
 * 투두 전역 관리용
 * @param {*} param0
 * @returns
 */
export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(todoReducer, todoListData);

    // alert(typeof dispatch);
    // 디스패치는 함수다
    const nextId = useRef(todoListData.todoItem.length);
    const todoDate = useRef(todayDate);
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                    <TodoDateContext.Provider value={todoDate}>{children}</TodoDateContext.Provider>
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

export function useTodoState() {
    const context = useContext(TodoStateContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useTodoDispatch() {
    const context = useContext(TodoDispatchContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useTodoNextId() {
    const context = useContext(TodoNextIdContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useTodoDate(params) {
    const context = useContext(TodoDateContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useShowCalender() {
    const context = useContext(CalendarShowContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}
