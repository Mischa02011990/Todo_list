import {v1} from "uuid";
import {
    addTodolistAC, ChangeTodolistFilterActionType,
    changeTodolistTitleAC, ChangeTodolistTitleActionType, changeTodolistFilterAC,
    removeTodolistAC, todolistReducer
} from "../Reducers/todolist-reducer";
import {FilterValuesType, TodolistType} from "../../TodoList";


test('correct todolist should be removed', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
});

test('correct todolist should be added', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const newTodolistTitle = 'New todolist';

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[0].filter).toBe('all')
    expect(endState[0].id).toBeDefined()
});

test('correct todolist should change its name', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const newTodolistTitle = 'New todolist';

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const action: ChangeTodolistTitleActionType = changeTodolistTitleAC(todolistId2, newTodolistTitle)

    const endState = todolistReducer(startState, action)

    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe(newTodolistTitle)
    expect(endState[0].title).toBe('What to learn')
});

test('correct filter of todolist should be changed', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const newFilter: FilterValuesType = 'completed';

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const action: ChangeTodolistFilterActionType = changeTodolistFilterAC(newFilter, todolistId2)

    const endState = todolistReducer(startState, action)

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
    expect(endState[0].title).toBe('What to learn')
});