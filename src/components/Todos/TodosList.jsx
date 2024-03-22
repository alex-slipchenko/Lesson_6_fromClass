import React, { useState, useEffect } from "react";
import method from "../../service/getMethodApi";
import "./style.css";

function TodosList(props) {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await method.get();
      setTodos(response.slice(0, 10));
    })();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await method.delete(id);
      setTodos((prevState) => prevState.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCompleted = async (item) => {
    const response = await method.patch(item.id, {
      completed: !item.completed,
    });

    setTodos((prevState) =>
      prevState.map((item) => {
        if (item.id === response.id) item = response; //меняем одну тудушку на ту что пришла с респонса
        return item;
      })
    );
  };
  return todos.length ? (
    <ul>
      {todos.map((item) => (
        <li
          key={item.id}
          style={{ color: item.completed ? "green" : "red" }}
          onClick={() => handleCompleted(item)}
        >
          {item.title}
          <button onClick={(e) => handleDelete(e, item.id)}>Delete</button>
        </li>
      ))}
    </ul>
  ) : null;
}

export default TodosList;
