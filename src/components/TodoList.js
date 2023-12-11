import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';

// 20231211 api 연동해서 데이터 받아오기
// 아오 진짜...
// 중복 호출 문제, 비동기 처리를 어케 할 건지...?
// 기존 예제(벨로퍼트)에서는 async 로 처리 했는데... 구글링 해 보니 promise 문이 훨 많음
// 공식 문서 참고해서 다시 해 보기...
// https://ko.legacy.reactjs.org/docs/faq-ajax.html#how-can-i-make-an-ajax-call
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
