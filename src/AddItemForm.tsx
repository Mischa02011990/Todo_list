import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddTaskRounded} from "@mui/icons-material";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title);
            setTitle('')
        } else {
            setError('Title is required!!!');
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.code === "Enter") {
            addItem();
        }
    }

    return (
        <div>
            <TextField variant='outlined'
                       error={!!error}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onOnKeyPressHandler}
                       label={'Type value'}
                       helperText={error}
            />
            <IconButton color='primary' onClick={addItem}>
                <AddTaskRounded/>
            </IconButton>
        </div>
    )
});

