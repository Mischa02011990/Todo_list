import React, {ChangeEvent, useCallback} from "react";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./State/Reducers/tasks-reducer";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsTaskType = {
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}

export const Task = React.memo((props: PropsTaskType) => {
    const dispatch = useDispatch();

    const onClickHandler = () => dispatch(removeTaskAC(props.task.id, props.todolistId));
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.task.id, e.currentTarget.checked, props.todolistId));
    }
    const onChangeTitleHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(props.task.id, newValue, props.todolistId))
    }, [props.task.id, changeTaskTitleAC, props.todolistId]);

    return (
        <div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
            <Checkbox
                onChange={onChangeStatusHandler}
                checked={props.task.isDone}
                color='primary'
            />

            <EditableSpan value={props.task.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})
