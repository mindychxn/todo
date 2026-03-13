export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// for redirecting to login page if session expired
const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      ...options.headers,
    },
  };

  const response = await fetch(url, config);

  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem('token');
    window.location.href = '/login';
    throw new Error('Session expired');
  }

  return response;
};

export const getTodos = async (complete) => {
  try {
    const response = await authFetch(`${API_URL}/todos?complete=${complete}`);
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await authFetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const createTodo = async (title, notes, due, priority, remind_at) => {
  try {
    const response = await authFetch(`${API_URL}/todos/create`, {
      method: 'POST',
      body: JSON.stringify({ title, notes, due, priority, remind_at }),
    });
    return response.ok;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const editTodo = async (id, title, notes, due, priority, remind_at, complete) => {
  try {
    const response = await authFetch(`${API_URL}/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, notes, due, priority, remind_at, complete }),
    });
    return response.ok;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getToday = async (complete) => {
  try {
    const response = await authFetch(`${API_URL}/todos/today?complete=${complete}`);
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getUsername = async () => {
  try {
    const response = await authFetch(`${API_URL}/dashboard/`);
    const data = await response.json();
    return data.username;
  } catch (err) {
    console.error(err);
    return '';
  }
};
