import { ChangeEvent, useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
type Todo = {
  id: number;
  title: string;
};

function App() {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currPage, setCurrPage] = useState(3);
  const numPages = Math.ceil(todos.length / entriesPerPage);

  //current todos to display based on page number
  const currTododsEndIndex = currPage * entriesPerPage;
  const currTodosBegIndex = currTododsEndIndex - entriesPerPage;
  const currTodos = todos.slice(currTodosBegIndex, currTododsEndIndex);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => setTodos(res.data))
      .catch((e) => console.log("error fetching"))
  }, []);

  const Pagination = () => {
    const pageNums = [];
    for (let i = 1; i <= numPages; i++)
      pageNums.push(i);
    return (
      <div>{pageNums.map((i) => <span><button onClick={() => setCurrPage(i)} className={i == currPage ? 'selected-page' : ""}>{i} | </button></span>)}</div>
    )
  }

  function handlePageSizeChange(event: ChangeEvent<HTMLSelectElement>): void {
    setEntriesPerPage(Number(event.target.value));
    setCurrPage(1);
  }

  return (
    <>
      <div><label htmlFor="pageSizeSelect" >Page Size: </label>
        <select id="pageSizeSelect" value={entriesPerPage} onChange={handlePageSizeChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>
      <br />
      <br />
      <div>
        {currTodos.map((todo) => <p key={todo.id}>{todo.title}</p>)}
      </div>
      <br />
      <br />
      <Pagination></Pagination>
    </>
  )
}

export default App
