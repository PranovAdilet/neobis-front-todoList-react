import React, {useEffect, useRef, useState, useCallback} from 'react';
import {saveToLocalStorage} from "../utils/localStorage";
import InputItem from "./InputItem";


const TodoItem = ({item, todo, setTodo}) => {

    const [, setCategory] = useState('')
    const [task, setTask] = useState(item ? item.task : 'Error')
    const [edit, setEdit] = useState(false)


    const inputRef = useRef(null)

    useEffect(() => {
        if (edit){
            inputRef.current.focus()
        }
        if (!edit) {
            setTodo(prevTodo =>
                prevTodo.map(el => (el.id === item.id ? { ...el, task } : el))
            )
        }
        saveToLocalStorage(todo)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [edit, task, setTodo, item.id])



    useEffect(() => {
        saveToLocalStorage(todo)
    }, [todo, setTodo])


    const editTask = useCallback(() => {
        if (edit && task.trim().length < 3){
            alert('Длина задачи должна быть не менее 3')
            inputRef.current.focus()
        } else {
            setEdit(prev => !prev)
        }
    }, [edit, task, setEdit])


    const deleteTask = useCallback(() => {
        setTodo((prevTodo) => {
            const newTodo = prevTodo.filter((el) => el.id !== item.id);
            if (newTodo.length === 0) {
                saveToLocalStorage([]);
            } else {
                saveToLocalStorage(newTodo);
            }
            return newTodo;
        });
    }, [item.id, setTodo])



    const checkTask = useCallback(() => {
        setTodo((prevTodo) =>
            prevTodo.map((el) => {
                if (el.id === item.id) {
                    return {
                        ...el,
                        check: !el.check,
                    };
                } else {
                    return el;
                }
            })
        );
        setCategory((prevCategory) => (prevCategory.length ? '' : 'icon-dot-circled'));
    }, [item.id, setTodo]);




    return (
        <div className="todo__item">
            <div className="todo__item-left">
                <i onClick={() => checkTask()} className={`icon-circle-empty todo__item-icon ${item.category} ${item.check && 'icon-dot-circled'}`}></i>
                {
                    !edit ? <p
                        className={`todo__item-text ${item.check ? 'todo__item-check' : ''}`}>{task}
                    </p> : <InputItem setTask={setTask} task={task} inputRef={inputRef} setEdit={setEdit} check={item.check}/>

                }
            </div>
            <div className="todo__item-btns">
                <button type={"button"} onClick={() => editTask()} className="todo__btn-edit">{
                    !edit ? 'Edit' : 'Save'
                }</button>
                <button type="button" onClick={() => deleteTask()} className="todo__btn-delete">Delete</button>
            </div>
        </div>
    );
};

export default TodoItem;