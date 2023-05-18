import React from "react";
import axios from "axios";

export const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "88caf47c-ab48-4f0c-abf0-098a71e6ef64"
    }
}


const instanse = axios.create({
    baseURL: "http://localhost:3000/",
    ...settings
})

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type ResponseType<D = {}> = {
    resultsCode: number
    messages: string[]
    data: D
}

export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadLine: string
    id: string
    todolistId: string
    order: number
    addedDate: string
}

export type GetTaskResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadLine: string
}

export const todolistsApi = {
    getTodolists() {
        return instanse.get<TodolistType[]>("todo-lists") // АДРЕС ЗАГЛУШКА!!!
    },
    createTodolist(title: string) {
        return instanse.post<ResponseType<{ item: TodolistType }>>("todo-lists", {title: title}) // АДРЕС ЗАГЛУШКА!!!
    },
    deleteTodolist(id: string) {
        return instanse.delete<ResponseType>(`todo-lists/${id}`, settings) // АДРЕС ЗАГЛУШКА!!!
    },
    updateTodolist(id: string, title: string) {
        return instanse.put<ResponseType>(`todo-lists/${id}`, {title: title}) // АДРЕС ЗАГЛУШКА!!!
    },
    getTasks(todlistId: string) {
        return instanse.get<GetTaskResponse>(`http://localhost:3000/${todlistId}/tasks`) // АДРЕС ЗАГЛУШКА!!!
    },
    createTask(title: string) {
        return instanse.post<ResponseType>(`http://localhost:3000/${title}/tasks`, {title: title}) // АДРЕС ЗАГЛУШКА!!!
    },
    deleteTask(todlistId: string, taskId: string) {
        return instanse.delete<ResponseType>(`http://localhost:3000/${todlistId}/tasks/${taskId}`) // АДРЕС ЗАГЛУШКА!!!
    },
    updateTask(todlistId: string, taskId: string, model: UpdateTaskModelType) {
        return instanse.put<UpdateTaskModelType>(`http://localhost:3000/${todlistId}/tasks/${taskId}${model}`) // АДРЕС ЗАГЛУШКА!!!
    }
}