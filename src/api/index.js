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
    if (error) {
      console.log(error.response);
    }
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
    if (error) {
      console.log(error.response);
    }
  }
};

export const createTodo = async (todo) => {
  try {
    const res = await request("/todos", {
      method: "POST",
      data: {
        todo,
      },
    });
    return res.data;
  } catch (error) {
    if (error) {
      console.log(error.response);
    }
  }
};

export const getTodos = async () => {
  try {
    const res = await request("/todos", {
      method: "GET",
    });
    return res.data;
  } catch (error) {
    if (error) {
      console.log(error.response);
    }
  }
};

export const updateTodo = async (todo, isCompleted, id) => {
  try {
    const res = await request(`/todos/${id}`, {
      method: "PUT",
      data: {
        todo,
        isCompleted,
      },
    });
    return res.data;
  } catch (error) {
    if (error) {
      console.log(error.response);
    }
  }
};

export const deleteTodo = async (id) => {
  try {
    const res = await request(`/todos/${id}`, {
      method: "DELETE",
    });
    return res.data;
  } catch (error) {
    if (error) {
      console.log(error.response);
    }
  }
};
