import React, {useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./State/store";
import {
    addTaskAC
} from "./State/Reducers/tasks-reducer";
import {Task, TaskType} from "./Task";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
}

export const TodoList = React.memo((props: TodolistPropsType) => {

    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id]);
    const dispatch = useDispatch();

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props.id, props.changeTodolistTitle])

    let allTodolistTasks = tasks;
    let tasksForTodolist = allTodolistTasks;

    if (props.filter === 'active') {
        tasksForTodolist = allTodolistTasks.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone)
    }

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), []);
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), []);

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={(title) => {
            dispatch(addTaskAC(title, props.id));
        }}/>
        <div>
            {
                props.tasks.map(t => <Task
                    key={t.id}
                    task={t}
                    todolistId={props.id}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    removeTask={props.removeTask}
                />)
            }
        </div>

        <div style={{paddingTop: '10px'}}>
            <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                    onClick={onAllClickHandler}
                    color={undefined}>All
            </Button>
            <Button variant={props.filter === 'active' ? 'contained' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'contained' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})
