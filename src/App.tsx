import { useState } from 'react';
import Header from './components/header'
import TodoList from './components/todolist';

export interface Result {
  combine: {
    draggableId: string;
    droppableId: string;
  } | null | undefined;
  destination: {
    droppableId: string;
    index: number;
  } | null | undefined;
  draggableId: string;
  mode: string;
  reason: string;
  source: {
    index: number;
    droppableId: string;
  };
  type: string;
}

export type TypeTodos = {
  id: string;
  todo: string;
  date: string;
  completed: boolean;
}[]



function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState<TypeTodos>([])



  const handleClick = () => {
    const date = new Date();
    const formattedDate = `${date.toString().replace(/\GMT(.*)/, '')}`
    if (todo === '') {
      alert('Todo cannot be empty!')
      return;
    };
    if (todos.find(aTodo => aTodo.todo === todo.trim().charAt(0).toLocaleUpperCase() + todo.trim().slice(1))) {
      alert(`This todo '${todo}' already exists. `);
      return;
    }
    setTodos(prevTodos => [...prevTodos, {
      id: todos.length.toString(),
      todo: todo.trim().charAt(0).toLocaleUpperCase() + todo.trim().slice(1),
      date: formattedDate,
      completed: false
    }]);
    setTodo('');
  }

  const handleCompleted = (id: string) => {
    const completedTodo = todos.findIndex(aTodo => aTodo.id === id);
    if (todos[completedTodo].completed === true) {
      const updatedTodo = { ...todos[completedTodo], completed: false }
      const newTodos = [...todos];
      newTodos[completedTodo] = updatedTodo;
      setTodos(newTodos);
      const todoElement = document.getElementById(id);
      todoElement?.classList.remove('check');
      return;
    }
    const updatedTodo = { ...todos[completedTodo], completed: true }
    const newTodos = [...todos];
    newTodos[completedTodo] = updatedTodo;
    setTodos(newTodos)
    const todoElement = document.getElementById(id);
    todoElement?.classList.add('check');
  }

  const handleDelete = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }

  const onDragEnd = (result: Result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    };

    if (
      destination.droppableId === source.droppableId && destination.index === source.index
    ) {
      return;
    };

    const items = [...todos];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(destination.index, 0, reorderedItem);
    setTodos(items);
  };


  return (
    <>
      <Header />
      <TodoList todos={todos} handleDelete={handleDelete} onDragEnd={onDragEnd} todo={todo} setTodo={setTodo} handleClick={handleClick} handleCompleted={handleCompleted} />

    </>
  )
}

export default App;
