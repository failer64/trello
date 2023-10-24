import './App.scss';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Description from './components/Description';
import { useAppDispatch, useAppSelector } from './app/store';
import { CaseType, Todos } from './types/types';
import moment from 'moment';
import TodoList from './components/TodoList';
import { actions } from './app/todoReducer';

export type ColumnsType = {
  id: CaseType;
  todos: Todos[];
};

const App = () => {
  const todos = useAppSelector(state => state.todo.todos);

  const queueTodos = todos.filter(t => t.status === 'queue');
  const developmentTodos = todos.filter(t => t.status === 'development');
  const completedTodos = todos.filter(t => t.status === 'completed');

  const columns: ColumnsType[] = [
    { id: 'queue', todos: queueTodos },
    { id: 'development', todos: developmentTodos },
    { id: 'completed', todos: completedTodos },
  ];

  const dispatch = useAppDispatch();

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    const queue = queueTodos;
    const development = developmentTodos;
    const completed = completedTodos;

    // Source Logic
    if (source.droppableId === 'queue') {
      add = queue[source.index];
      queue.splice(source.index, 1);
    } else if (source.droppableId === 'development') {
      add = development[source.index];
      development.splice(source.index, 1);
    } else {
      add = completed[source.index];
      completed.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === 'queue') {
      queue.splice(destination.index, 0, add);
      add.status = 'queue';
      add.dateOfDone = '';
    } else if (destination.droppableId === 'development') {
      development.splice(destination.index, 0, add);
      add.status = 'development';
      add.dateOfDone = '';
    } else {
      if (source.droppableId !== destination.droppableId) {
        const date = moment().format('Do MMMM YYYY - HH:mm');
        add.dateOfDone = date;
      }
      add.status = 'completed';
      completed.splice(destination.index, 0, add);
    }

    dispatch(actions.rerenderApp([...queue, ...development, ...completed]));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main className="content">
        <div className="container">
          <Description />
          <div className="body">
            {columns.map(c => (
              <TodoList key={c.id} column={c} />
            ))}
          </div>
        </div>
      </main>
    </DragDropContext>
  );
};

export default App;
