import React, {useEffect, useState} from 'react';
import TodoItem from "./components/TodoItem";

import {
    getNameFromLocalStorage,
    getTodoListFromLocalStorage,
    saveNameToLocalStorage,
    saveToLocalStorage
} from "./utils/localStorage";


const TodoList = () => {

    const todoFromStorage = getTodoListFromLocalStorage()

    const [todo, setTodo] = useState(todoFromStorage || [])
    const [category, setCategory] = useState('')
    const [task, setTask] = useState('')

    const nameFromLocalStorage = getNameFromLocalStorage()

    const [nameInput, setNameInput] = useState(nameFromLocalStorage || '')

    let timeId

    const addTodo = (e) => {
        e.preventDefault()
        if (!category.length){
            return alert('You need to select a category!')
        }
        if (!task.trim().length){
            return alert('You need to write something!')
        }

        const newTodo = {
            id: Date.now(),
            category,
            task,
            check: false
        }

        setTodo([...todo, newTodo])
        saveToLocalStorage(todo)
        setTask('')
        setCategory('')
    }

    const changeInputHandler = (e) => {
        setTask(e.target.value)
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        timeId = setTimeout(() => {
            saveNameToLocalStorage(nameInput)
        }, 700)
    }, [nameInput]);


    const handleNameInput = (e) => {
        clearTimeout(timeId)
        setNameInput(e.target.value)
    }


    return (
        <form onSubmit={(e) => addTodo(e)} className="todo">
            <div>
                <label className="todo__label">
                    <h1 className="todo__title">What`s up, </h1>
                    <input value={nameInput} onChange={handleNameInput} placeholder="Name here" maxLength={20} className="todo__title-input"/>
                </label>
            </div>
            <p className="todo__subtitle">CREATE A TODO</p>
            <p className="todo__text">What`s on your todo-list?</p>
            <input value={task} onChange={(e) => changeInputHandler(e)} placeholder="write your task" minLength="3" maxLength="35" className="todo__input" type="text"/>
            <p className="todo__text">Pick a category</p>

            <div className="todo__category">
                <div className="todo__category-box">
                    <i onClick={() => setCategory('icon__business')} className={`icon-circle-empty icon__business ${category === "icon__business" ? 'icon-dot-circled' : ""}`}></i>
                    <p className="todo__category-choice">Business</p>
                </div>
                <div className="todo__category-box">
                    <i onClick={() => setCategory('icon__personal')} className={`icon-circle-empty icon__personal ${category === "icon__personal" ? 'icon-dot-circled' : ""}`}></i>
                    <p className="todo__category-choice">Personal</p>
                </div>
            </div>
            <button type="submit" className="todo__btn">Add Todo</button>

            <p className="todo__subtitle">TODO LIST</p>
            <div className="todo__list">
                {
                    todo.map((item, idx) => (
                        <TodoItem todo={todo} setTodo={setTodo} key={item.id} item={item}/>
                    ))
                }
            </div>
        </form>
    );
};

export default TodoList;