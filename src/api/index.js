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

export const createTodo = async (todo, token) => {
  try {
    const res = await request("/todos", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export const getTodos = async (token) => {
  try {
    const res = await request("/todos", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error) {
      console.log(error.response);
    }
  }
};

export const updateTodo = async (todo, isCompleted, id, token) => {
  try {
    const res = await request(`/todos/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export const deleteTodo = async (id, token) => {
  try {
    const res = await request(`/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error) {
      console.log(error.response);
    }
  }
};
