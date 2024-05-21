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
    console.log(">>> Selected todo: ", selectedTodo);
    setFields([
      {
        name: ["todo"],
        value: selectedTodo.todo,
      },
    ]);
  }, [selectedTodo]);

  const addNewTodo = () => {
    message.info("Add new todo success!!!", 0.5);
    const { getFieldValue } = form;
    const todo = getFieldValue("todo");

    let newId = idTodo + 1;
    setTodoList([
      ...todoList,
      {
        id: newId,
        todo: todo,
      },
    ]);
    setIdTodo(newId);
  };

  const editTodo = (todo) => {
    message.info("Edit todo success!!!", 0.5);
    console.log(">>> Edit todo: ", todo);
  };

  const deleteTodo = (todo) => {
    message.info("Delete Todo", 0.5);
    const newTodoList = todoList.filter((item) => item.id != todo.id);
    setTodoList(newTodoList);
  };

  const showModal = (item) => {
    console.log(">>> Open modal", item);
    setSelectedTodo({ ...item });
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log(">>> Submit edit todo: ");
    formModalEditTodo.submit();
    // setIsModalOpen(false);
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
