import { AxiosError } from "axios";
import { request } from "./api";

export const signUp = async (email, password) => {
  try {
    const res = await request("/auth/signup", {
      method: "POST",
      data: {
        email,
        password,
      },
    });
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response);
    }
    return false;
  }
};

export const signIn = async (email, password) => {
  try {
    const res = await request("/auth/signin", {
      method: "POST",
      data: {
        email,
        password,
      },
    });
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response);
    }
    return false;
  }
};

export const createTodo = async (id, todo, isComplete, userId, token) => {
  try {
    const res = await request("/todos", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        id,
        todo,
        isComplete,
        userId,
      },
    });
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.message);
    }
    return false;
  }
};

export const getTodos = async (token) => {
  try {
    const res = await request("/todos", {
      method: "GET",
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQHRlc3QuY29tIiwic3ViIjoyLCJpYXQiOjE2NzUyNTE0MjAsImV4cCI6MTY3NTg1NjIyMH0.VsygSrAtPyto0pVXXGOOhm77GV_nnsDqfuFs329Mpq8",
      },
    });
    console.log("res", res);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log();
    }
    return false;
  }
};

export const updateTodo = async (todo, isComplete, token) => {
  try {
    const res = await request("/todos/:id", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        todo,
        isComplete,
      },
    });
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.message);
    }
    return false;
  }
};

export const deleteTodo = async (token) => {
  try {
    const res = await request("/todos/:id", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.message);
    }
  }
  return false;
};
