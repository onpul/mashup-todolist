import React, { useRef, createContext, useContext, useReducer } from 'react';
import moment from 'moment';

const defaultTodoList = [
    {
        userId: 'onpul',
        date: '2023-12-14',
        id: 1,
        content: '가습기 세척하기',
        completed: true,
        selectedDate: null,
    },
    {
        userId: 'onpul',
        date: '2023-12-11',
        id: 2,
        content: '쓰레기통 비우기',
        completed: false,
        selectedDate: null,
    },
    {
        userId: 'onpul',
        date: '2023-12-15',
        id: 3,
        content: '마우스, 키보드 전원 끄기',
        completed: false,
        selectedDate: null,
    },
    {
        userId: 'onpul',
        date: '2023-12-12',
        id: 4,
        content: '리액트 운영 배포 확인하기',
        completed: false,
        selectedDate: null,
    },
    {
        userId: 'onpul',
        date: '2023-12-15',
        id: 5,
        content: '연차 일정 확인하기',
        completed: true,
        selectedDate: null,
    },
];

const today = moment().format('YYYY-MM-DD');

function todoReducer(state, action) {
    switch (action.type) {
        case 'CREATE':
            console.log('state : ' + JSON.stringify(state.concat(action.todo)));
            return state.concat(action.todo);
        case 'READ':
            return state;
        case 'DELETE':
            return state.filter((todo) => todo.id !== action.id);
        case 'TOGGLE':
            return state.map((todo) =>
                todo.id === action.id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            );
        case 'SELECT':
            console.log('>>> 원본배열 : ' + JSON.stringify(state) + ' <<<');
            console.log('>>> 오늘날짜 : ' + today + ' <<<');
            console.log('>>> 선택한날짜 : ' + action.selectedDate + ' <<<');
            console.log(
                '>>> 필터링된배열 : ' +
                    JSON.stringify(
                        state.filter(
                            (todo) => todo.date === action.selectedDate
                        )
                    ) +
                    ' <<<'
            );
            // return state;
            return state.filter((todo) => todo.date === action.selectedDate);

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(todoReducer, defaultTodoList);
    const nextId = useRef(6);
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                    {children}
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
