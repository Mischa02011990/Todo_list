import {userReducer} from "../Reducers/user-reducer";

test('user reducer increment only age', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Boba'}

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)
})

test('user reducer increment only childrenCount', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Boba'}

    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.childrenCount).toBe(3)
    expect(endState.age).toBe(20)
})

test('user reducer should change name of user', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Boba'}
    const newName = "Biba"

    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName: newName})

    expect(endState.name).toBe(newName)
    expect(startState.name).not.toBe(endState.name)
    expect(endState.childrenCount).toBe(2)
    expect(endState.age).toBe(20)
})

