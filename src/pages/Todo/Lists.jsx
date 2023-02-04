import List from "./List";

const Lists = ({ todos, setTodos }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <List setTodos={setTodos} todo={todo} />
      ))}
    </ul>
  );
};
export default Lists;
