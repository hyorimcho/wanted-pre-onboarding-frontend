import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Todo from "./pages/Todo";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route index path="/" element={<Home />} /> */}
        <Route index path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
