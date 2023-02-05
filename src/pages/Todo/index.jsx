import styled from "styled-components";
import { RiAddFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { createTodo, getTodos } from "../../api";
import { useNavigate } from "react-router-dom";
import Lists from "./Lists";

const token = localStorage.getItem("token");

const Todo = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (!localStorage.token) {
      alert("로그인이 필요합니다");
      navigate("/signin");
    }
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

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
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
        <LogoutBtn
          type="submit"
          onClick={() => {
            logout();
          }}
        >
          <FiLogOut />
        </LogoutBtn>
        <Title>
          <h1>할 일🐰</h1>
          <TodoInput onSubmit={onSubmit} todos={todos} setTodos={setTodos}>
            <input
              type="text"
              name="value"
              placeholder="할 일을 추가 해 주세요"
              value={value}
              data-testid="new-todo-input"
              onChange={onChange}
              ref={inputRef}
            />
            <button type="submit" data-testid="new-todo-add-button">
              <RiAddFill />
            </button>
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
  margin: 40px 0 30px 0;
  background-color: #cde990;
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
    background-color: transparent;
    border: none;
    font-size: 20px;
    line-height: 1;
    margin-right: 0.5rem;
    cursor: pointer;
    &:hover {
      color: navy;
    }
  }
`;

const LogoutBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 22px;
  display: flex;
  margin-left: auto;
  &:hover {
    color: red;
  }
`;
