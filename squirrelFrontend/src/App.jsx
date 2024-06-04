import { useEffect, useRef, useState } from "react";
import "./App.css";
import { baseUrl } from "./config";
import clsx from "clsx";

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const formRef = useRef();

  const loadTodos = async () => {
    let res = await fetch(`${baseUrl}/api/todos/getAll`);
    setTodoList(await res.json());
  };

  const createNewTodo = async () => {
    let res = await fetch(`${baseUrl}/api/todos/createNew`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title,
        detail,
      }),
    });
    const response = await res.json();
    if (!!response?.success) {
      formRef?.current?.reset?.();
      loadTodos();
    }
  };

  const deleteTodo = async (event, _id) => {
    let res = await fetch(`${baseUrl}/api/todos/delete/${_id}`, {
      method: "DELETE",
    });
    const response = await res.json();
    if (!!response?.success) {
      loadTodos();
    } else {
      response?.message?.length && alert(response.message);
    }
    event?.preventDefault();
  };

  const createTodoElement = (todo) => {
    return (
      <div className="todo" key={todo._id}>
        <div className="column">{todo.title}</div>
        <div className={clsx("column", "detailTodo")}>{todo.detail}</div>
        <div className="column">{formatDate(todo.createdDate)}</div>
        <div className={clsx("column", "textAlignEnd")}>
          <button onClick={(e) => deleteTodo(e, todo._id)}>Delete</button>
        </div>
      </div>
    );
  };

  const formatDate = (dateStr) =>{
    const date = new Date(dateStr);
    return `${date.toLocaleDateString()}  ${date.toLocaleTimeString()}`;
  }

  const handleSubmit = (event) => {
    const errMsg = [];
    if (!title?.length) {
      errMsg.push("Please enter title todo");
    }
    if (!detail?.length) {
      errMsg.push("Please enter detail todo");
    }
    if (errMsg?.length) {
      alert("Please confirm validation form below: \n" + errMsg.join("\n"));
    } else {
      createNewTodo();
    }
    event?.preventDefault();
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="App">
      <h1>Todo App</h1>
      <form id="todo-form" className="form" ref={formRef}>
        <textarea
          type="text"
          id="todo-title-input"
          rows="2" cols="50"
          placeholder="Enter title todo"
          onChange={(e) => {
            setTitle(e?.target?.value);
          }}
        />
        <textarea
          type="text"
          id="todo-detail-input"
          rows="4" cols="50"
          placeholder="Enter detail todo"
          onChange={(e) => {
            setDetail(e?.target?.value);
          }}
        />
        <button onClick={(e) => handleSubmit(e)}>Add</button>
      </form>
      <div id="todo-list">
        <div className="todo">
          <div className="column">Title</div>
          <div className={clsx("column", "detailTodo")}>Detail</div>
          <div className="column">Created Date</div>
          <div className="column">
          </div>
        </div>
        {todoList?.map(createTodoElement)}
      </div>
    </div>
  );
};

export default App;
