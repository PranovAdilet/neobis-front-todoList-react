import React from 'react';

const InputItem = ({task, inputRef, setTask, setEdit, check}) => {
    const changeInputHandler = (e) => {
        setTask(e.target.value)
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            if (task.trim() !== "") {
                setEdit(false);
            } else {
                alert('Поле не может быть пустым!');
            }
        }

    }

    return (
        <input
            onChange={(e) => changeInputHandler(e)}
            value={task}
            className={`todo__item-input ${check && 'todo__item-check'}`}
            ref={inputRef}
            onKeyDown={handleKeyDown}
            minLength={3}
            maxLength={32}
        />
    );
};

export default InputItem;