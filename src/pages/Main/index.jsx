import { Navigate } from "react-router-dom";

const Main = () => {
  return localStorage.token ? <Navigate to="/todo" /> : <Navigate to="/signin" />;
};
export default Main;
