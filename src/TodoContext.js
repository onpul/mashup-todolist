import React, { useRef, createContext, useContext, useReducer } from 'react';
import moment from 'moment';

const todayDate = moment().format('YYYY-MM-DD');
const showData = {
    showCalendar: false,
    showForm: false,
    showSetting: false,
    showEditMode: false,
    showTodoList: false,
};
const todoListData = {
    minDate: todayDate,
    maxDate: todayDate,
    option: 'day',
    allChecked: false,
    filter: null,
    todoItem: [
        {
            date: '2024-03-11',
            id: 1,
            content: '투두 리스트 어쩌구',
            completed: false,
            checked: false,
        },
        {
            date: '2024-03-12',
            id: 2,
            content: '투두 더미데이터 어쩌구',
            completed: true,
            checked: false,
        },
        {
            date: '2024-03-13',
            id: 3,
            content: '맛있는 거 먹기 어쩌구',
            completed: false,
            checked: false,
        },
        {
            date: '2024-03-13',
            id: 4,
            content: '집에 가고싶다 어쩌구',
            completed: true,
            checked: false,
        },
        {
            date: '2024-03-13',
            id: 5,
            content: '어쩌구 저쩌구',
            completed: true,
            checked: false,
        },
        {
            date: '2024-03-13',
            id: 6,
            content: '어쩌구 저쩌구 어쩌구 저쩌구',
            completed: true,
            checked: false,
        },
        {
            date: '2024-03-13',
            id: 7,
            content: '어쩌구 저쩌구 어쩌구 저쩌구',
            completed: true,
            checked: false,
        },
        {
            date: '2024-03-13',
            id: 8,
            content: '어쩌구 저쩌구 어쩌구 저쩌구',
            completed: true,
            checked: false,
        },
        {
            date: '2024-03-11',
            id: 9,
            content: '어쩌구 저쩌구 어쩌구 저쩌구',
            completed: true,
            checked: false,
        },
        {
            date: '2024-03-11',
            id: 10,
            content: '가습기 세척하기',
            completed: true,
            checked: false,
        },
        {
            date: '2024-03-11',
            id: 11,
            content: '쓰레기통 비우기',
            completed: false,
            checked: false,
        },
        {
            date: '2024-03-11',
            id: 12,
            content: '마우스, 키보드 전원 끄기',
            completed: false,
            checked: false,
        },
        {
            date: '2024-02-18',
            id: 13,
            content: '리액트 운영 배포 확인하기',
            completed: false,
            checked: false,
        },
        {
            date: '2024-02-18',
            id: 14,
            content: '연차 일정 확인하기',
            completed: true,
            checked: false,
        },
        {
            date: '2024-03-18',
            id: 15,
            content: '연차 일정 확인하기',
            completed: true,
            checked: false,
        },
        {
            date: '2024-03-18',
            id: 16,
            content: 'TODOTEST 어쩌구1',
            completed: true,
            checked: false,
        },
        {
            date: '2024-03-20',
            id: 17,
            content: 'TODOTEST 어쩌구2',
            completed: true,
            checked: false,
        },
    ],
};

function componentReducer(state, action) {
    switch (action.type) {
        case 'SHOWCALENDAR':
            return {
                ...state,
                showCalendar: action.showCalendar,
            };
        case 'SHOWORHIDE':
            return {
                ...state,
                showForm: action.showForm,
                showSetting: action.showSetting,
                showEditMode: action.showEditMode,
            };
        default:
            return state;
    }
}
function todoReducer(state, action) {
    // console.log('>>여기는 todoReducer<<');
    // console.log('state = ' + JSON.stringify(state));
    // console.log('action = ' + JSON.stringify(action));
    switch (action.type) {
        case 'CREATE':
            return { ...state, todoItem: state.todoItem.concat(action.todo) };
        case 'DELETE':
            return {
                ...state,
                todoItem: state.todoItem.filter((todo) => !action.id.includes(todo.id)),
            };
        case 'CHECKTOGGLE':
            return {
                ...state,
                todoItem: state.todoItem.map((todo) => (todo.id === action.id ? { ...todo, completed: !todo.completed } : todo)),
            };
        case 'AllCHECKTOGGLE':
            debugger;
            return {
                ...state,
                allChecked: !state.allChecked,
                todoItem: state.todoItem.map((todo) => (action.id.indexOf(todo.id) > -1 ? { ...todo, checked: !state.allChecked } : todo)),
            };
        case 'EDITCHECK':
            return {
                ...state,
                todoItem: state.todoItem.map((todo) => (todo.id === action.id ? { ...todo, checked: !todo.checked } : todo)),
            };
        case 'ALLDONE':
            return {
                ...state,
                todoItem: state.todoItem.map((todo) => (action.id.indexOf(todo.id) > -1 ? { ...todo, completed: true } : todo)),
            };
        case 'ALLYET':
            return {
                ...state,
                todoItem: state.todoItem.map((todo) => (action.id.indexOf(todo.id) > -1 ? { ...todo, completed: false } : todo)),
            };
        case 'SELECTDATE':
            console.log('>>> 여기는 todoReducer / SELECTDATE 분기 <<<');
            console.log(JSON.stringify({ ...state, minDate: action.minDate, maxDate: action.maxDate, option: action.option }));
            return { ...state, minDate: action.minDate, maxDate: action.maxDate, option: action.option };

        case 'SHOWDONELIST':
            return {
                ...state,
                filter: 'done',
                todoItem: state.todoItem.filter((todo) => action.id.includes(todo.id) && todo.completed),
            };
        case 'SHOWYETLIST':
            return {
                ...state,
                filter: 'yet',
                todoItem: state.todoItem.filter((todo) => action.id.includes(todo.id) && !todo.completed),
            };
        default:
            return state;
    }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();
const TodoDateContext = createContext();

/**
 * todo 데이터 전역 관리용
 * @param {*} param
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

const ComponentStateContext = createContext();
const ComponentDispatchContext = createContext();

/**
 * 컴포넌트 노출 전역 관리용
 * @param {*} param
 * @returns
 */
export function ComponentProvider({ children }) {
    const [showState, showDispatch] = useReducer(componentReducer, showData);

    return (
        <ComponentStateContext.Provider value={showState}>
            <ComponentDispatchContext.Provider value={showDispatch}>{children}</ComponentDispatchContext.Provider>
        </ComponentStateContext.Provider>
    );
}

export function useShowState() {
    const context = useContext(ComponentStateContext);
    if (!context) {
        throw new Error('Cannot find ComponentProvider');
    }
    return context;
}

export function useShowDispatch() {
    const context = useContext(ComponentDispatchContext);
    if (!context) {
        throw new Error('Cannot find ComponentDispatchContext');
    }
    return context;
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
