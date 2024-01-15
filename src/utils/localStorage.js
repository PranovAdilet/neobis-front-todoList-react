

export const saveToLocalStorage = (todo) => {
     localStorage.setItem('todolist', JSON.stringify(todo))
}

export const getTodoListFromLocalStorage = () => {
    let todolist = JSON.parse(localStorage.getItem('todolist'))
    if (todolist){
        return todolist
    }
}

export const saveNameToLocalStorage = (name) => {
    localStorage.setItem('TodoName', JSON.stringify(name))
}

export const getNameToLocalStorage = () => {
    return  JSON.parse(localStorage.getItem('TodoName'))
}
