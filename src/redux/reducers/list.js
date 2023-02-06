import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllPosts = createAsyncThunk(
    'todo/getAllPosts',
    async () => {
        try {
            console.log('start')
            const res = await axios('https://jsonplaceholder.typicode.com/posts');
            if (res.status !== 200) {
                throw new Error("Some error! Status isn't 200");
            }
            console.log('end')
            return res.data;
        } catch (err) {
            throw new Error(err);
        }
    }
)

const todoSlice = createSlice({
    name: 'todoSlice',
    initialState: {
        todos: [{ id: 1, title: 'todo1', completed: false, striked: false },
        { id: 2, title: 'todo2', completed: false, striked: true },
        { id: 3, title: 'todo3', completed: true, striked: false },
        { id: 4, title: 'todo4', completed: false, striked: false },
        { id: 5, title: 'todo5', completed: false, striked: false }],
        count: 5,
        status: '',
        error: '',
    },
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: state.count + 1,
                title: action.payload.title,
                completed: false,
                striked: false,
            };
            state.count = state.count + 1;
            state.todos.push(todo);
        },
        deleteTodo: (state, action) => {
            const index = state.todos.findIndex((todo) => todo.id === action.payload);
            state.todos.splice(index, 1);
        },
        completeTodo: (state, action) => {
            const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
            state.todos[index].completed = !state.todos[index].completed
        },
        strikeTodo: (state, action) => {
            const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
            state.todos[index].striked = !state.todos[index].striked;
        },
    },
    extraReducers: {
        [getAllPosts.pending]: (state, action) => { // Ожидание
            state.status = 'loading';
        },
        [getAllPosts.fulfilled]: (state, action) => { // Корректно
            //Убрать лишние поля тиа юзерид
            state.todos = action.payload;
            state.count = 100;
            state.status = 'success';
        },
        [getAllPosts.rejected]: (state, action) => { // Ошибка
            state.status = 'error';
            state.error = action.error.message;
        },
    }
});

export const { addTodo, deleteTodo, completeTodo, strikeTodo } = todoSlice.actions;


export default todoSlice.reducer

