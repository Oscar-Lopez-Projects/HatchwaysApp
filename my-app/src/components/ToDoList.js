import React from 'react';
import ToDo from './Todo';
import '../styling/StudentCard.css';
const ToDoList = ({toDoList, handleToggle, handleFilter}) => {
    return (
        <div className='tag-div-container'>
            {toDoList.map(todo => {
                return (
                    <div className='tag-div'>
                    <ToDo todo={todo} />
                    </div>
                )
            })}
        </div>
    );
};

export default ToDoList;