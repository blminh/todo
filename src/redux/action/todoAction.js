export const ADD_TODO = "ADD_TODO";
export const EDIT_TODO = "EDIT_TODO";
export const DELETE_TODO = "DELETE_TODO";

export const addTodoAction = (todo) => {
  return { type: ADD_TODO, payload: todo };
};

export const editTodoAction = (todo) => {
  return { type: EDIT_TODO, payload: todo };
};

export const deleteTodoAction = (todoId) => {
  return { type: DELETE_TODO, payload: todoId };
};
