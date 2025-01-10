export const getTodos = async (complete) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:3000/todos?complete=${complete}`, {
      method: 'GET',
      headers: {
        'token': token,
        'Content-Type': 'application/json'      
      },
    });
    const jsonData = await response.json(); // parse
    return jsonData;
  } catch (err) {
    console.error(err);
  }
};

export const deleteTodo = async (id) => {
  try {
    const deleteTodo = await fetch(`http://localhost:3000/todos/${id}`, { method: 'DELETE' });
  } catch (err) {
    console.error(err);
  }
};

export const createTodo = async (description, due) => {
  try {
    const jwt = localStorage.getItem('token');
    const body = { description, due };
    const response = await fetch(`http://localhost:3000/todos/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'token': jwt },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error(err);
  }
};

export const editTodo = async (id, description, due, complete) => {
  try {
    const body = { description, due, complete };
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error(err);
  }
};

export const getToday = async (completed) => {
  try {
    console.log("getting")
    const body = { completed };
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/todos/today-ya', {
      method: 'GET',
      headers: {
        'token': token,
        'Content-Type': 'application/json',
        body: JSON.stringify(body),
      },
    });
    const jsonData = await response.json();
    return jsonData;
  } catch (err) {
    console.error(err);
  }
};