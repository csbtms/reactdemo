import { useState, useEffect } from 'react';


function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo === ' ') {
        return;
    }
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, checked: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].checked = !updatedTodos[index].checked;

    // Rearrange the list if a todo is checked
    if (updatedTodos[index].checked) {
      const checkedTodo = updatedTodos.splice(index, 1)[0];
      updatedTodos.unshift(checkedTodo);
    }

    setTodos(updatedTodos);
  };
  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    
    setTodos(updatedTodos);
  };
    const deleteAllTodos = () => {
    setTodos([]);
  };

  return (
    <div className="container w-[400px] mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Todo App</h1>
          {/* Delete All Button */}
          {todos.length > 0 && (
        <div className="mb-4 text-center">
          <button onClick={deleteAllTodos} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Delete All
          </button>
        </div>)}
      {/* Input form */}
      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a todo"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button 
          onClick={addTodo}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
        >
          Add
        </button>
      </div>

      {/* Todo list */}
      <ul className="divide-y divide-gray-200">
        {todos.map((todo, index) => (
          <li key={index} className="py-2 flex items-center justify-between">
            <div className="flex items-center">
              <input
                type='checkbox'
                checked={todo.checked}
                onChange={() => toggleTodo(index)}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className={` ${todo.checked ? 'line-through text-gray-500' : 'text-gray-900'}`}>{todo.text}</span>
            </div>
            <button onClick={(e) => { e.preventDefault(); deleteTodo(index); }} className="text-red-500 hover:text-red-700 font-bold">X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

