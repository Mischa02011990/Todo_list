import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TaskStateType
} from "../Reducers/tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "../Reducers/todolist-reducer";


test('correct task should be deleted from correct array', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: 'GraphQL', isDone: true},
            {id: '2', title: 'ES6 & TS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'Caffe', isDone: true},
            {id: '2', title: 'Tea', isDone: true},
        ]
    };

    const action = removeTaskAC('2', 'todolistId2');
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(1)
    expect(endState['todolistId2'].every(t => t.id != '2')).toBeTruthy()
});

test('correct task should be added to correct array', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: 'GraphQL', isDone: true},
            {id: '2', title: 'ES6 & TS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'Caffe', isDone: true},
            {id: '2', title: 'Tea', isDone: true}
        ]
    };

    const action = addTaskAC('juce', 'todolistId2');
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].isDone).toBe(false)
});

test('status of specified task should be changed', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: 'GraphQL', isDone: true},
            {id: '2', title: 'ES6 & TS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'Caffe', isDone: true},
            {id: '2', title: 'Tea', isDone: true}
        ]
    };

    const action = changeTaskStatusAC('2', false, 'todolistId2');
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'][0].id).toBeDefined()


});

test('title of specified task should be changed', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: 'GraphQL', isDone: true},
            {id: '2', title: 'ES6 & TS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'Caffe', isDone: true},
            {id: '2', title: 'Tea', isDone: true}
        ]
    };

    const action = changeTaskTitleAC('2', 'green tea', 'todolistId2');
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId2'][1].title).toBe('green tea')
    expect(endState['todolistId1'][0].title).toBe('GraphQL')
});

test('new property with new array should be added when new todolist is added', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: 'GraphQL', isDone: true},
            {id: '2', title: 'ES6 & TS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'Caffe', isDone: true},
            {id: '2', title: 'Tea', isDone: true}
        ]
    };

    const action = addTodolistAC('new todolist');
    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != 'todolistId!' && k != 'todolistId2');
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).not.toEqual([]);
});

test('property with todolistId should be deleted', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: 'GraphQL', isDone: true},
            {id: '2', title: 'ES6 & TS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'Caffe', isDone: true},
            {id: '2', title: 'Tea', isDone: true}
        ]
    };

    const action = removeTodolistAC('todolistId2');
    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).toBeUndefined();
});