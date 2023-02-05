import { useState } from "react";
import { RiDeleteBin5Line, RiEdit2Fill, RiCheckFill } from "react-icons/ri";
import { ImCancelCircle } from "react-icons/im";
import styled from "styled-components";
import { deleteTodo, updateTodo } from "../../api";

const List = ({ todo, todos, setTodos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState("");

  const handleCompleChange = async (id) => {
    let newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    await updateTodo(todo.todo, todo.isCompleted, id);
    setTodos(newTodos);
  };
  const delTodo = async (id) => {
    await deleteTodo(id);
    let newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const editTodo = async (value) => {
    const { id, isCompleted } = todo;
    const res = await updateTodo(value, isCompleted, id);
    if (!value) {
      alert("수정할 할 일을 입력해 주세요");
      return;
    }
    const newTodo = todos.map((todo) => {
      if (todo.id === res.id) {
        return res;
      } else return todo;
    });
    setTodos(newTodo);
    setValue(res.todo);
    setIsEditing(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editTodo(value);
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <TodoList key={todo.id} id={todo.id}>
      <div>
        <input type="checkbox" checked={todo.isCompleted} onChange={() => handleCompleChange(todo.id)} />
        {isEditing ? (
          <form onSubmit={onSubmit}>
            <input value={value} onChange={onChange} autoFocus data-testid="modify-input" />
          </form>
        ) : (
          <Text isCompleted={todo.isCompleted}>{todo.todo}</Text>
        )}
      </div>
      <BtnWrapper>
        {isEditing ? (
          <>
            <Btn
              type="submit"
              data-testid="modify-button"
              onClick={() => {
                editTodo(value);
              }}
              edit
            >
              <RiCheckFill />
            </Btn>
            <Btn
              type="button"
              onClick={() => {
                setIsEditing(false);
              }}
            >
              <ImCancelCircle />
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
              edit
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
  text-decoration: ${(props) => (props.isCompleted ? "line-through" : "none")};
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
    color: ${(props) => (props.edit ? "#04ce04" : "red")};
  }
`;
