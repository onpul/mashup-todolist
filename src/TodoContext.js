import React, { useRef, createContext, useContext, useReducer } from 'react';
import moment from 'moment';

const todayDate = moment().format('YYYY-MM-DD');
const todoListData = {
    selectedDate: todayDate,
    todoItem: [
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

function todoReducer(state, action) {
    switch (action.type) {
        case 'CREATE':
            return { ...state, todoItem: state.todoItem.concat(action.todo) };
        case 'DELETE':
            return {
                ...state,
                todoItem: state.todoItem.filter(
                    (todo) => todo.id !== action.id
                ),
            };
        case 'TOGGLE':
            return {
                ...state,
                todoItem: state.todoItem.map((todo) =>
                    todo.id === action.id
                        ? { ...todo, completed: !todo.completed }
                        : todo
                ),
            };
        case 'SELECT':
            return { ...state };
        default:
            return state;
    }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();
const TodoDateContext = createContext();

/**
 * 투두 전역 관리용
 * @param {*} param0
 * @returns
 */
export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(todoReducer, todoListData);
    // 리듀서를 통해 리턴하는 값이 state 를 바꾸고 있음
    // 그래서 날짜 선택해서 필터링 하면 state 원본 배열도 바뀜 ㅠㅠ
    console.log('>>> TodoProvider <<<');
    console.log(JSON.stringify(todoListData));

    // alert(typeof dispatch);
    // 디스패치는 함수다
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
