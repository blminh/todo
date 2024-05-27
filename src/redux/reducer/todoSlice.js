import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  todoList: [
    { id: 1, todo: "Watching TV" },
    { id: 2, todo: "Playing game" },
    { id: 3, todo: "Reading book" },
  ],
  todoId: 3,
};

const todoSlice = createSlice({
  name: "todo",
  initialState: INITIAL_STATE,
  reducers: {
    addTodo(state, action) {
      const newTodoId = state.todoId + 1;
      state.todoList.push({
        id: newTodoId,
        todo: action.payload,
      });
      state.todoId = newTodoId;
    },
    editTodo(state, action) {
      const result = state.todoList.map((item) =>
        item.id == action.payload.id
          ? { id: item.id, todo: action.payload.todo }
          : item
      );
      return {
        ...state,
        todoList: result,
      };
    },
    deleteTodo(state, action) {
      return {
        ...state,
        todoList: state.todoList.filter((item) => item.id !== action.payload),
      };
    },
  },
});

export const { actions, reducer } = todoSlice;
export const { addTodo, editTodo, deleteTodo } = actions;
export default reducer;
