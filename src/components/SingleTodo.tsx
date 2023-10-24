import { FC, useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import pencil from './../assets/images/pencil.svg';
import ok from './../assets/images/arrow.svg';
import del from './../assets/images/delete.svg';
import { Todos } from '../types/types';
import { useDispatch } from 'react-redux';
import { actions } from '../app/todoReducer';
import ChangeTodo from './ChangeTodo';

type PropsType = {
  index: number;
  todo: Todos;
};

const SingleTodo: FC<PropsType> = ({ todo, index }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(todo.title || '');
  const [fullMode, setFullMode] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(todo.title); // sync with store
  }, [todo.title]);

  const handleEdit = () => {
    if (title.trim()) {
      dispatch(actions.changeTitle(title, todo.id));
      setEditMode(false);
    } else {
      dispatch(actions.changeTitle('untitled', todo.id));
      setTitle('untitled');
      setEditMode(false);
    }
  };

  const handleDelete = () => {
    dispatch(actions.deleteTodo(todo.id));
  };

  const handleEditMode = () => {
    setEditMode(true);
    if (title === 'untitled') {
      setTitle('');
    }
  };

  return (
    <>
      <Draggable draggableId={todo.id.toString()} index={index}>
        {(provided, snapshot) => (
          <li
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`${snapshot.isDragging ? 'drag' : ''}`}
          >
            <div className="todos__single">
              {editMode || !todo.title ? (
                <input
                  value={title}
                  onChange={e => setTitle(e.currentTarget.value)}
                  className="todos__single--text"
                  autoFocus
                  onBlur={handleEdit}
                />
              ) : (
                <span className="todos__single--text">{title}</span>
              )}
              <div className="block">
                {editMode || !todo.title ? (
                  <div className="item" onClick={handleEdit}>
                    <img src={ok} alt="rewrite" width={'18px'} />
                  </div>
                ) : (
                  <button onClick={handleEditMode} className="item">
                    <img src={pencil} alt="rewrite" width={'18px'} />
                  </button>
                )}
                <button onClick={() => setFullMode(true)} className="item">
                  ...
                </button>
                <button onClick={handleDelete} className="item">
                  <img src={del} alt="delete" width={'18px'} />
                </button>
              </div>
            </div>
          </li>
        )}
      </Draggable>
      {fullMode && <ChangeTodo setEditMode={setFullMode} todo={todo} />}
    </>
  );
};

export default SingleTodo;
