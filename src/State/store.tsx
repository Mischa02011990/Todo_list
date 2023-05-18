import {combineReducers, createStore} from "redux";
import {todolistReducer} from "./Reducers/todolist-reducer";
import {tasksReducer} from "./Reducers/tasks-reducer";

export const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);


// @ts-ignore
window.store = store;