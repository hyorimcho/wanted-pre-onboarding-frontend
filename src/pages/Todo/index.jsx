import styled from "styled-components";
import { RiDeleteBin5Line, RiAddFill, RiEdit2Fill } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../../api";
import Lists from "./Lists";

const token = localStorage.getItem("token");

const Todo = () => {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await getTodos(token);
      setTodos(res);
    };
    getData();
  }, []);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!e.target.value) {
      return;
    }
    addTodo(value);
    setValue("");
    inputRef.current.focus();
  };

  const editTodo = async (value, isCompleted, token) => {
    const { id } = todos;
    const res = await updateTodo(value, isCompleted, id, token);
  };

  const addTodo = async (value) => {
    if (!value) {
      alert("할 일을 입력해주세요!");
      return;
    }
    const res = await createTodo(value, token);
    setTodos([...todos, res]);
  };

  return (
    <Container>
      <TodoBlock>
        <Title>
          <h1>To do list</h1>
          <TodoInput onSubmit={onSubmit} todos={todos} setTodos={setTodos}>
            <input
              type="text"
              name="value"
              placeholder="할 일을 입력해주세요"
              value={value}
              data-testid="new-todo-input"
              onChange={onChange}
              ref={inputRef}
            />
            <Btn type="submit" data-testid="new-todo-add-button">
              <RiAddFill />
            </Btn>
          </TodoInput>
          <Lists todos={todos} setTodos={setTodos} />
        </Title>
      </TodoBlock>
    </Container>
  );
};

export default Todo;

const Container = styled.div`
  max-width: 450px;
  margin-inline: auto;
  margin-top: 200px;
`;
const TodoBlock = styled.div`
  padding: 30px;
  margin-top: 50px;
  background: #fff;
  border-radius: 10px;
  box-shadow: -9px 17px 13px rgb(0 0 0 / 16%);
  position: relative;
`;
const Title = styled.div`
  label {
    align-items: center;
    line-height: 2;
    display: flex;
    &:nth {
      gap: 30px;
    }
  }
`;
const TodoInput = styled.form`
  margin: 20px 0;
  background-color: #ffd4d4;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  align-items: center;
  input {
    width: 100%;
    border: none;
    padding: 8px;
    line-height: 1.5;
    background-color: transparent;
  }
  button {
    line-height: 1;
    margin-right: 0.5rem;
  }
`;
const TodoList = styled.li`
  display: flex;
  list-style: none;
  justify-content: space-between;
  margin-bottom: 6px;
  input {
    margin-right: 8px;
  }
  div {
    display: flex;
  }
`;

const Text = styled.p`
  text-decoration: ${(props) => (props.isCompleted === true ? "line-through" : "none")};
`;
const BtnWrapper = styled.div`
  position: relative;
  display: flex;
  gap: 6px;
`;
const Btn = styled.button`
  background-color: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    color: #09bb00;
  }
`;
