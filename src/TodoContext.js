import React, { useRef, createContext, useContext, useReducer } from 'react';

const defaultTodoList = [
    {
        userId: 'onpul',
        id: 1,
        content: '고양이 츄르 주기',
        completed: false,
    },
    {
        userId: 'onpul',
        id: 2,
        content: '떡볶이 사 먹기',
        completed: false,
    },
    {
        userId: 'onpul',
        id: 3,
        content: '헬스장 가서 하체 운동 하기',
        completed: false,
    },
    {
        userId: 'onpul',
        id: 4,
        content: '선인장에 물 주기',
        completed: true,
    },
    {
        userId: 'onpul',
        id: 5,
        content: '연말 계획 세우기',
        completed: true,
    },
];

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
        default:
            console.log('>>> error <<<');
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
    return useContext(TodoStateContext);
}

export function useTodoDispatch() {
    return useContext(TodoDispatchContext);
}

export function useTodoNextId() {
    return useContext(TodoNextIdContext);
}
