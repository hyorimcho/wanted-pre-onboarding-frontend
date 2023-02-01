import styled from "styled-components";
import { RiDeleteBin5Line, RiAddFill, RiEdit2Fill } from "react-icons/ri";
import { useState } from "react";
import { createTodo } from "../../api";

const Todo = () => {
  const [values, setValues] = useState("");
  const onSubmit = async (data) => {
    const { id, todo, isComplete, userId } = data;
    const test = await createTodo(id, todo, isComplete, userId);
    console.log(test);
  };
  return (
    <Container>
      <TodoBlock>
        <Title>
          <h1>할 일 목록</h1>
          <TodoInput onSubmit={onSubmit}>
            <input
              type="text"
              name="value"
              placeholder="할 일을 입력해주세요"
              // value={value}
              data-testid="new-todo-input"
            />
            <Btn type="submit" data-testid="new-todo-add-button">
              <RiAddFill />
            </Btn>
          </TodoInput>
          <TodoList>
            <label>
              <input type="checkbox" defaultChecked={false} /> <p></p>
              <BtnWrapper>
                <Btn type="submit" data-testid="modify-button">
                  <RiEdit2Fill />
                </Btn>
                <Btn type="submit" data-testid="delete-button">
                  <RiDeleteBin5Line />
                </Btn>
              </BtnWrapper>
            </label>
          </TodoList>
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
  input {
    border: none;
    padding: 8px;
    line-height: 1.5;
    background-color: transparent;
  }
  button {
    margin-right: 0.5rem;
    padding: auto 0;
  }
`;
const TodoList = styled.li`
  list-style: none;
  input {
    margin-right: 8px;
  }
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
