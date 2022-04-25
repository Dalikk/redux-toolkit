import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function(_, {rejectWithValue}) {
        try {
            const  response = await fetch('http://jsonplaceholder.typicode.com/todos?_limit=10');
            if (!response.ok) {
                throw new Error('Server Error!');
            }

            const data = await response.json();

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
        
    }
);

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async function(id, {rejectWithValue, dispatch}) {
        try {
            const response = await fetch(`http://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Can\'t delete task. Server error');
            }

            dispatch(removeTodo({id}));

        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
};

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: [],
        status: null,
        error: null,
    },
    reducers: {
        addTodo(state, action) {
            state.todos.push({
                id: new Date().toISOString(),
                text: action.payload.text,
                completed: false,
            })
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
        },
        toggleTodoComplete(state, action) {
            const toggledTodo = state.todos.find(todo => todo.id === action.payload.id);
            toggledTodo.completed = !toggledTodo.completed;
        }
    },
    extraReducers: {
        [fetchTodos.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchTodos.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.todos = action.payload;
        },
        [fetchTodos.rejected]: setError,
        [deleteTodo.rejected]: setError,
    },
});

export const {addTodo, removeTodo, toggleTodoComplete} = todoSlice.actions;

export default todoSlice.reducer;