import { createReducer } from "@reduxjs/toolkit";
import { ADD_TODO, DELETE_TODO, EDIT_TODO } from "../action/todoAction";

const INITIAL_STATE = {
  todoList: [
    { id: 1, todo: "Watching TV" },
    { id: 2, todo: "Playing game" },
    { id: 3, todo: "Reading book" },
  ],
  todoId: 3,
};

const todoReducer = createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(ADD_TODO, (state, action) => {
      console.log(
        ">>> Todo reducer - add todo - state: ",
        state.todoList[0].id
      );
      const newTodoId = state.todoId + 1;
      state.todoList.push({
        id: newTodoId,
        todo: action.payload,
      });
      state.todoId = newTodoId;
    })
    .addCase(EDIT_TODO, (state, action) => {
      console.log(">>> Todo reducer - edit todo - action: ", action);
      const result = state.todoList.filter((item) => {
        console.log(item.id);
        console.log(action.payload.id);
        if (item.id === action.payload.id)
          return {
            id: item.id,
            todo: action.payload.todo,
          };
        return item;
      });
      console.log(">>> Todo reducer - edit todo: ", result[1].todo);
      return {
        ...state,
        todoList: result,
      };
    })
    .addCase(DELETE_TODO, (state, action) => {
      console.log(">>> Todo reducer - delete todo - action: ", action);
      return {
        ...state,
        todoList: state.todoList.filter((item) => item.id !== action.payload),
      };
    });
});

export default todoReducer;
