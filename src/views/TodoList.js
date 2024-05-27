import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Avatar,
  Divider,
  List,
  message,
  Modal,
} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodoAction,
  deleteTodoAction,
  editTodoAction,
} from "../redux/action/todoAction";
import { addTodo, editTodo, deleteTodo } from "../redux/reducer/todoSlice";

const TodoList = () => {
  const [form, formModalEditTodo] = Form.useForm();
  // const todoList = useSelector((state) => state.rootReducer.worker.todoList);
  const todoList = useSelector((state) => state.todoSlice.todoList);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({});
  const [fields, setFields] = useState([
    {
      name: ["todo"],
      value: selectedTodo.todo,
    },
  ]);

  useEffect(() => {
    setFields([
      {
        name: ["todo"],
        value: selectedTodo.todo,
      },
    ]);
  }, [selectedTodo]);

  const handleAddNewTodo = () => {
    const { getFieldValue, setFieldValue } = form;
    const todo = getFieldValue("todo");

    if (!todo) {
      message.error("Empty todo!", 1);
      return;
    }

    dispatch(addTodo(todo));
    setFieldValue("todo", "");
    message.info("Add new todo success!!!", 1);
  };

  const handleEditTodo = (todo) => {
    setSelectedTodo({
      ...selectedTodo,
      todo: todo[0].value,
    });
  };

  const handleDeleteTodo = (todo) => {
    dispatch(deleteTodo(todo.id));
    message.info(`Delete todo: ${todo.todo}`, 1);
  };

  const showModal = (item) => {
    setSelectedTodo({ ...item });
    setIsModalOpen(true);
  };

  const handleOk = () => {
    dispatch(editTodo(selectedTodo));
    message.info("Edit todo success!!!", 1);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Form
        form={form}
        name="add_todo"
        style={{ maxWidth: 600, minWidth: 300, margin: "auto" }}
      >
        <Form.Item
          name="todo"
          rules={[{ required: true, message: "Please input your todo!!!" }]}
        >
          <Input placeholder="Please input your todo" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={() => {
              handleAddNewTodo();
            }}
          >
            Add new todo
          </Button>
        </Form.Item>
      </Form>
      <div
        id="scrollableDiv"
        style={{
          height: 360,
          maxWidth: 600,
          minWidth: 300,
          margin: "auto",
          overflow: "auto",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
        }}
      >
        <InfiniteScroll
          dataLength={todoList.length}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={todoList}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                actions={[
                  <Button onClick={() => showModal(item)} type="primary" ghost>
                    Edit
                  </Button>,
                  <Button onClick={() => handleDeleteTodo(item)} danger>
                    Delete
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src="logo192.png" />}
                  title={item.todo}
                />
                <div></div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
      <Modal
        title="Edit todo"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          fields={fields}
          form={formModalEditTodo}
          onFieldsChange={(_, allFields) => {
            handleEditTodo(allFields);
          }}
          layout="vertical"
          name="edit_todo"
        >
          <Form.Item
            name="todo"
            label="Todo"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TodoList;
