import React, { useState } from 'react';
import styled from 'styled-components';
import { useTodoState, useTodoDispatch, useTodoNextId, useTodoDate } from '../TodoContext';

// const CircleButton = styled.button`
//     text-align: center;
//     color: white;
//     border: none;
//     border-radius: 50%;
//     height: 35px;
//     width: 35px;
//     background: #6699ff;
//     cursor: pointer;
//     z-index: 999;
//     position: absolute;
//     left: 50%;
//     bottom: 0px;
//     transform: translate(-50%, 50%);
//     /* transition: 0.125s all ease-in; */
//     ${(props) =>
//         props.open &&
//         css`
//             background: #ff6b6b;
//         `}
// `;

const InsertFormPositioner = styled.div`
    width: 100%;
    bottom: 0;
    left: 0;
    position: absolute;
`;

const InsertForm = styled.form`
    background: #f8f9fa;
    padding-left: 32px;
    padding-top: 32px;
    padding-right: 32px;
    padding-bottom: 72px;

    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    width: 100%;
    outline: none;
    font-size: 18px;
    box-sizing: border-box;
`;

function TodoCreate() {
    const [value, setValue] = useState('');

    const dispatch = useTodoDispatch();
    const nextId = useTodoNextId();
    const todoDate = useTodoDate();

    const todo = useTodoState();

    const onChange = (e) => setValue(e.target.value);
    const onSubmit = () => {
        dispatch(
            {
                type: 'CREATE',
                todo: {
                    id: nextId.current,
                    content: value,
                    completed: false,
                    date: todoDate.current, // 선택한 날짜, 전역값으로 관리됨
                },
            },
            [{ todo }]
        );
        // console.log('nextId : ' + nextId.current);
        // console.log('text : ' + value);
        setValue('');
        nextId.current += 1;
    };

    return (
        <>
            {todo.showForm ? (
                <InsertFormPositioner>
                    <InsertForm onSubmit={onSubmit}>
                        <Input autoFocus placeholder="할 일을 입력 후, Enter 를 누르세요" onChange={onChange} value={value} />
                    </InsertForm>
                </InsertFormPositioner>
            ) : (
                ''
            )}
        </>
    );
}

export default React.memo(TodoCreate);
