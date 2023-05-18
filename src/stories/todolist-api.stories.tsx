import React, {useEffect, useState} from "react";
import {todolistsApi, UpdateTaskModelType} from "../api/todolists-api";


export default {
    title: 'API'
}


export const GetTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsApi.getTodolists()
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {

    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')

    useEffect(() => {
        todolistsApi.createTodolist(title)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'title'} value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>

            <button onClick={CreateTodolist}>create todolist</button>
        </div>
    </div>
}
export const DeleteTodolist = () => {

    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    useEffect(() => {

        todolistsApi.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div>{JSON.stringify(state)}
        <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <button onClick={DeleteTodolist}>delete todolist</button>
    </div>
}
export const UpdateTodolist = () => {

    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    useEffect(() => {
        todolistsApi.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}
        <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <input placeholder={'title'} value={title} onChange={(e) => {
            setTitle(e.currentTarget.value)
        }}/>
        <button onClick={UpdateTodolist}>update todolist</button>
    </div>
}


export const GetTasks = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '';
        todolistsApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data.items);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {

    const [state, setState] = useState<any>(null)
    const title = '' // ИЗМЕНИТЬ!!!!!
    useEffect(() => {

        todolistsApi.createTask(title)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    useEffect(() => {
        todolistsApi.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'taskId'} value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>

            <button onClick={DeleteTask}>delete task</button>
        </div>
    </div>
}

export const UpdateTask = () => {

    const [state, setState] = useState<any>(null)
    const todolistId = useState<string>('')
    const taskId = useState<string>('')
    const model = useState<UpdateTaskModelType>()

    useEffect(() => {
        todolistsApi.updateTask(todolistId, taskId, model)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}



