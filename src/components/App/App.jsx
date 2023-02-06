import '../../styles/App/App.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo, strikeTodo, completeTodo, getAllPosts } from '../../redux/reducers/list';

function App() {
  const [value, setValue] = useState('');
  const { todos, status, error } = useSelector((store) => store.todoSlice);
  const dispatch = useDispatch();


  const onSubmit = (event) => {
    event.preventDefault();
    if (value) {
      dispatch(
        addTodo({
          title: value,
        })
      );
    }
  };


  useEffect(() => {
    dispatch(getAllPosts())

    return () => {

    }
  }, [dispatch])


  return (
    <>
      <form onSubmit={onSubmit} className='appForm'>
        <label >Задача</label>
        <input
          className='appForm--addTask'
          type='text'
          placeholder='Добавить...'
          value={value}
          onChange={(event) => setValue(event.target.value)}
        ></input>

        <button className='appForm--button-plus'>
          +
        </button>
      </form>
      {status === 'loading' && '...Loading'}
      {error ? error : ''}

      <ul>
        {todos.map((task) => (

          <li key={task?.id}>
            <p onClick={() => dispatch(strikeTodo(task))}
              className="todo-striked"
              style={{ textDecoration: task?.striked ? 'line-through' : 'none' }}>
              {task.title}
            </p>
            <label>
              <input type='checkbox' className="todo-checked" onClick={() => dispatch(completeTodo(task))} />
              <span></span>
            </label>
            <button className='swing' onClick={() => dispatch(deleteTodo(task.id))}>🗑️</button>
          </li>

        ))}
      </ul>

    </>
  );
}

export default App;
