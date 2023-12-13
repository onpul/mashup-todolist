import React, { useState } from 'react';
import TodoItem from './components/TodoItem';

function TodoAction() {
    const { todoData, setTodoData } = useState(null);
    const onRemove = (id) => {
        setTodoData(todoData.filter((TodoItem) => todoData.id !== id));
    };
}

export default TodoAction;
