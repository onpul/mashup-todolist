import React, { useRef, createContext, useContext, useReducer } from 'react';
import moment from 'moment';

const defaultTodoList = {
    todos: [
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
            date: '2023-12-18',
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
    ],
};

const todayDate = moment().format('YYYY-MM-DD');

function todoReducer(state, action) {
    console.log(
        '>>> 리듀서 진입, 원본 배열 : ' + JSON.stringify(state.todos) + ' <<<'
    );
    switch (action.type) {
        case 'CREATE':
            console.log(
                'CREATE 결과 : ' +
                    JSON.stringify(state.todos.concat(action.todo))
            );
            return { ...state, todos: state.todos.concat(action.todo) };
        // case 'READ':
        //     return state;
        case 'DELETE':
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.id),
            };
        case 'TOGGLE':
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === action.id
                        ? { ...todo, completed: !todo.completed }
                        : todo
                ),
            };
        case 'SELECT':
            // console.log(
            //     '>>> 원본배열 : ' + JSON.stringify(state.todos) + ' <<<'
            // );
            // console.log('>>> 오늘날짜 : ' + todayDate + ' <<<');
            // console.log('>>> 선택한날짜 : ' + action.selectedDate + ' <<<');
            // console.log(
            //     '>>> 필터링된배열 : ' +
            //         JSON.stringify(
            //             state.todos.filter(
            //                 (todo) => todo.date === action.selectedDate
            //             )
            //         ) +
            //         ' <<<'
            // );
            console.log(
                '>>> 원본배열 : ' + JSON.stringify(state.todos) + ' <<<'
            );

            return {
                ...state,
                todos: state.todos.filter(
                    (todo) => todo.date === action.selectedDate
                ),
            };
        default:
            return state;
    }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();
const TodoDateContext = createContext();

export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(todoReducer, defaultTodoList);
    const nextId = useRef(6);
    const todoDate = useRef(todayDate);
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                    <TodoDateContext.Provider value={todoDate}>
                        {children}
                    </TodoDateContext.Provider>
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
