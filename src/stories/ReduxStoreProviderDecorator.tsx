import React from 'react';
import {Provider} from "react-redux";
import {AppRootStateType} from "../State/store";
import {combineReducers, createStore} from "redux";
import {todolistReducer} from "../State/Reducers/todolist-reducer";
import {tasksReducer} from "../State/Reducers/tasks-reducer";
import {v1} from "uuid";

export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', filter: false}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', filter: true}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
  return   <Provider
        store={storyBookStore}> {storyFn()}
    </Provider>
}

