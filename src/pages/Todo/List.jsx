import { useState } from "react";
import { RiDeleteBin5Line, RiEdit2Fill } from "react-icons/ri";
import styled from "styled-components";
import { deleteTodo } from "../../api";

const token = localStorage.getItem("token");

const List = ({ todo, setTodos }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState("");
  const delTodo = async (id) => {
    const res = await deleteTodo(id, token);
    // let newTodos = todos.filter((todo) => todo.id !== id);
    // setTodos(newTodos);
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <TodoList
      key={todo.id}
      id={todo.id}
      onClick={() => {
        setIsCompleted(!isCompleted);
      }}
    >
      <div>
        <input type="checkbox" defaultChecked={false} />
        {isEditing ? (
          <input value={todo.todo} autoFocus onChange={onChange} />
        ) : (
          <Text isCompleted={isCompleted}>{todo.todo}</Text>
        )}
      </div>
      <BtnWrapper>
        {isEditing ? (
          <>
            <Btn type="submit" data-testid="modify-button">
              수정하기
            </Btn>
            <Btn
              type="button"
              onClick={() => {
                setIsEditing(false);
              }}
            >
              취소하기
            </Btn>
          </>
        ) : (
          <>
            <Btn
              type="submit"
              data-testid="modify-button"
              onClick={() => {
                setIsEditing(true);
              }}
            >
              <RiEdit2Fill />
            </Btn>
            <Btn
              type="submit"
              data-testid="delete-button"
              onClick={() => {
                delTodo(todo.id);
              }}
              id={todo.id}
            >
              <RiDeleteBin5Line />
            </Btn>
          </>
        )}
      </BtnWrapper>
    </TodoList>
  );
};
export default List;

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
