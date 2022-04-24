import React from 'react'

const TodoItem = ({toggleTodoComplete, removeTodo, id, text, completed}) => {
  return (
    <li>
      <input 
            type="checkbox" 
            checked={completed}
            onChange={() => toggleTodoComplete(id)}
          />
          <span>{text}</span>
          <span className='delete' onClick={() => removeTodo(id)}>
            &times;
          </span>
    </li>
  )
}

export default TodoItem