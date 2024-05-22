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

const TodoList = () => {
  const [form, formModalEditTodo] = Form.useForm();

  const [todoList, setTodoList] = useState([
    { id: 1, todo: "Watching TV" },
    { id: 2, todo: "Playing game" },
    { id: 3, todo: "Reading book" },
  ]);
  const [idTodo, setIdTodo] = useState(todoList.length);
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

  const addNewTodo = () => {
    const { getFieldValue } = form;
    const todo = getFieldValue("todo");

    if (!todo) {
      message.error("Empty todo!", 0.5);
      return;
    }

    let newId = idTodo + 1;
    setTodoList([
      ...todoList,
      {
        id: newId,
        todo: todo,
      },
    ]);
    setIdTodo(newId);
    message.info("Add new todo success!!!", 0.5);
  };

  const editTodo = (todo) => {
    setSelectedTodo({
      ...selectedTodo,
      todo: todo[0].value,
    });
  };

  const deleteTodo = (todo) => {
    const newTodoList = todoList.filter((item) => item.id != todo.id);
    setTodoList(newTodoList);
    message.info(`Delete todo: ${todo.todo}`, 1);
  };

  const showModal = (item) => {
    setSelectedTodo({ ...item });
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const todoListAfterEdit = todoList.filter((item) =>
      item.id === selectedTodo.id ? (item.todo = selectedTodo.todo) : item.todo
    );
    setTodoList(todoListAfterEdit);
    message.info("Edit todo success!!!", 0.5);
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
              addNewTodo();
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
                  <Button onClick={() => deleteTodo(item)} danger>
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
            editTodo(allFields);
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
