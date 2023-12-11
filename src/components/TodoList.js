import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';

// 20231211 api 연동해서 데이터 받아오기
import axios from 'axios';

const TodoListBlock = styled.div`
    flex: 1;
    padding: 20px 32px;
    padding-bottom: 48px;
    overflow-y: auto;
`;

function TodoList() {
    const [todoData, setTodoData] = useState(null);
    const [procData, setProcData] = useState(null);

    useEffect(() => {
        console.log('>>>마운트<<<');

        const controller = new AbortController();
        const fetchTodoData = async () => {
            try {
                setTodoData(null);
                const resultData = axios.get(
                    'https://jsonplaceholder.typicode.com/todos',
                    { signal: controller.signal }
                );
                console.log('>>> axios 요청 완료 <<<');
                console.log(resultData.data);
                setProcData(
                    resultData.data.filter((todo) => todo.userId === 1)
                );
                setTodoData(procData);

                return () => {
                    console.log('>>>언 마운트 및 axios 요청 취소');
                    controller.abort();
                };
            } catch (e) {
                console.log(e);
            }
        };

        fetchTodoData();
    }, [procData]);
    return (
        <TodoListBlock>
            {todoData &&
                todoData.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        id={todo.id}
                        text={todo.title}
                        done={todo.completed}
                    />
                ))}
        </TodoListBlock>
    );
}

export default TodoList;
