import React, { useState } from 'react';
import { styled } from 'styled-components';
import { useTodoState, useTodoDispatch, useTodoNextId, useTodoDate } from '../TodoContext';
import CheckCircleTemplate from './CheckCircleTemplate';
import TodoHead from './TodoHead';

const TodoCreateBlock = styled.div`
    height: auto;
    border-radius: 16px;
    background-color: #ffffff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    height: 100%;
    padding-left: 32px;
    padding-right: 32px;
`;

const FormBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    /* padding-top: 5px; */
    /* padding-bottom: 5px; */
`;

const ButtonBlock = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-left: 32px;
    padding-right: 32px;
`;

const InsertForm = styled.form`
    flex: 1;
    width: 100%;
    height: 75px;
    margin-right: 20px;
    background: #f8f9fa;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
`;

const Input = styled.input`
    /* padding: 12px; */
    /* padding-right: 20px; */
    border-radius: 4px;
    /* border: 1px solid #dee2e6; */
    padding: 0;
    border: 0;
    width: 100%;
    height: 100%;
    outline: none;
    font-size: 1em;
    box-sizing: border-box;
`;

const AddButton = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    background: #e9ecef;
    color: #ff6b6b;
    border: none;
    width: 100%;
    height: 35px;
    margin: 0 5px;
    border-radius: 5px;
    cursor: pointer;
    /* background: #ff6b6b; */

    span {
        margin-top: auto;
        margin-bottom: auto;
        font-weight: 900;
    }
`;

function TodoCreateTemplate() {
    const [value, setValue] = useState('');
    const dispatch = useTodoDispatch();
    const nextId = useTodoNextId();
    const todoDate = useTodoDate();
    const todo = useTodoState();

    const onChange = (e) => setValue(e.target.value);
    const onSubmit = () => {
        debugger;
        if (value.length < 1) {
            alert('내용을 입력해 주세요.');
        } else {
            dispatch(
                {
                    type: 'CREATE',
                    todo: {
                        id: nextId.current + 1,
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
        }
    };
    const onCancel = () => {
        dispatch(
            {
                type: 'SHOWORHIDE',
                showForm: false,
            },
            [{ todo }]
        );
    };

    return (
        <>
            <TodoCreateBlock>
                <TodoHead />
                <FormBlock>
                    <CheckCircleTemplate props={{ done: false, id: '', disabled: true }} />
                    <InsertForm onSubmit={onSubmit}>
                        <Input autoFocus placeholder="할 일을 입력해 주세요." onChange={onChange} value={value} />
                    </InsertForm>
                </FormBlock>
                <ButtonBlock>
                    <AddButton onClick={onSubmit}>
                        <span>추가</span>
                    </AddButton>
                    <AddButton onClick={onCancel}>
                        <span>취소</span>
                    </AddButton>
                </ButtonBlock>
            </TodoCreateBlock>
        </>
    );
}

export default React.memo(TodoCreateTemplate);
