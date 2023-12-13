import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import axios from 'axios';

const TodoListBlock = styled.div`
    flex: 1;
    padding: 20px 32px;
    padding-bottom: 48px;
    overflow-y: auto;
`;

function TodoList() {
    const [todoData, setTodoData] = useState(null);

    useEffect(() => {
        console.log('>>> 마운트 <<<');

        const fetchTodoData = async () => {
            try {
                const response = await axios.get(
                    'https://jsonplaceholder.typicode.com/todos'
                );
                console.log('>>> axios 요청 완료 <<<');
                // console.log(response.data);
                // const procData = response.data.filter(
                //     (todo) => todo.userId === 1
                // );
                const procData = response.data;
                console.log(response);

                // 바인딩 될 TODO 데이터 set
                setTodoData(procData);
            } catch (e) {
                console.log(e);
            }
        };

        fetchTodoData();

        return () => {
            console.log('>>> 언마운트 <<<');
        };
    }, []);
    return (
        <TodoListBlock>
            {todoData &&
                todoData.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        id={todo.id}
                        text={todo.title}
                        done={todo.completed} // boolean 타입
                    />
                ))}
        </TodoListBlock>
    );
}

export default TodoList;
