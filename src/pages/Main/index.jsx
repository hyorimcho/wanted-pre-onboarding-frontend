import { Navigate } from "react-router-dom";

const Main = () => {
  console.log(localStorage.token);

  return localStorage.token ? <Navigate to="/todo" /> : <Navigate to="/signin" />;
};
export default Main;
