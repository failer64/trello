import { FC } from 'react';
import { CaseType } from '../../types/types';
import { useAppDispatch } from '../../app/store';
import { ColumnsType } from '../../App';
import { actions } from '../../app/todoReducer';
import moment from 'moment';
import { Droppable } from 'react-beautiful-dnd';
import SingleTodo from '../SingleTodo';

type TodoListType = {
  column: ColumnsType;
};
const TodoList: FC<TodoListType> = ({ column }) => {
  const dispatch = useAppDispatch();

  const addTusk = (value: CaseType) => {
    dispatch(
      actions.addTodo({
        id: Date.now(),
        title: '',
        status: value, //priority: 'low',
        description: '',
        dateCreated: moment().format('Do MMMM YYYY - HH:mm'),
        dateOfDone: '',
      }),
    );
  };

  return (
    <div key={column.id} className={`todos todos_${column.id}`}>
      <h4 className="todos__title">{column.id} Tasks</h4>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <ul
            className={`${snapshot.isDraggingOver ? 'dragcomplete' : 'remove'}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {column.todos.map((qt, i) => (
              <SingleTodo index={i} todo={qt} key={qt.id} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
      <button className="button" onClick={() => addTusk(column.id)}>
        <span>+</span>New
      </button>
    </div>
  );
};

export default TodoList;
