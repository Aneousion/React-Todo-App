import { Draggable } from 'react-beautiful-dnd';
import { TypeTodos } from '../App';

interface TodosProps {
    todos: TypeTodos;
    handleDelete: (id: string) => void;
    handleCompleted: (id: string) => void;
}

export default function Todos({ todos, handleDelete, handleCompleted }: TodosProps) {
    return (
        <>
            {todos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            id={todo.id}
                            className='todo'
                            >
                            <li >
                            <button
                                    onClick={() => handleDelete(todo.id)}
                                    className='deletebutton'
                                >❌</button>
                                {todo.completed ? (
                                    <input type="checkbox"  id='cb' checked onClick={() => handleCompleted(todo.id)}/>
                                ) : (
                                    <input type="checkbox" id='cb' onClick={() => handleCompleted(todo.id)}/>
                                )}
                                <span>{todo.todo}</span>
                                <i className='date'>Created at: {todo.date}</i>
                                
                                
                            </li>
                        </div>
                    )}
                </Draggable>
            ))}
        </>
    )
}
