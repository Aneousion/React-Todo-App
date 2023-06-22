import { DragDropContext } from 'react-beautiful-dnd';
import { StrictModeDroppable } from './strictModeDroppable';
import { Result, TypeTodos } from '../App';
import Todos from './todos';

interface TodoListProps {
    todos: TypeTodos;
    todo: string;
    setTodo: (todo: string) => void;
    handleClick: () => void;
    onDragEnd: (result: Result) => void;
    handleDelete: (id: string) => void;
    handleCompleted: (id: string) => void;
}

export default function TodoList({ todos, onDragEnd, handleClick, handleDelete, todo, setTodo, handleCompleted }: TodoListProps) {
    return (
        <>
            <DragDropContext
                onDragEnd={onDragEnd}
            >
                <div className='todoinput'>
                    <input placeholder="Add a new todo..." onChange={e => setTodo(e.target.value)} value={todo} id="todo" type="text" />
                    <input type="submit" onClick={handleClick} value='Add' />
                </div>
                <StrictModeDroppable droppableId="droppable">
                    {(provided) => (
                        <div className='board'
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            <ul>
                                <Todos todos={todos} handleDelete={handleDelete} handleCompleted={handleCompleted} />
                                {provided.placeholder}
                            </ul>

                        </div>

                    )}
                </StrictModeDroppable>
                <p>Drag todos to prioritize<br/>Completed {todos.filter(todo => todo.completed === true).length} of {todos.length} total todos.</p>
            </DragDropContext>
        </>

    )
}
