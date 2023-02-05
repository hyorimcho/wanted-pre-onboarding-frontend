import List from "./List";

const Lists = ({ todos, setTodos }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <List setTodos={setTodos} todos={todos} todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
export default Lists;
