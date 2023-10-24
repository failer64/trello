import { CaseType, Todos } from '../types/types';
import { Types } from './store';

const initialState = {
  todos: [] as Todos[],
};

const todoReducer = (
  state = initialState,
  action: ActionsTypes,
): InitialStateType => {
  switch (action.type) {
    case 'todolist/todo-reducer/ADD-TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case 'todolist/todo-reducer/CHANGE-TODO':
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload.id ? action.payload : t,
        ),
      };
    case 'todolist/todo-reducer/CHANGE-TITLE':
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload.id
            ? { ...t, title: action.payload.title }
            : t,
        ),
      };
    case 'todolist/todo-reducer/DELETE-TODO':
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== action.payload),
      };
    case 'todolist/todo-reducer/RERENDER':
      return {
        ...state,
        todos: action.payload,
      };
    case 'todolist/todo-reducer/CHANGE-STATUS':
      return {
        ...state,
      };
    default:
      return state;
  }
};

export const actions = {
  addTodo: (todo: Todos) =>
    ({ type: 'todolist/todo-reducer/ADD-TODO', payload: todo }) as const,
  changeTitle: (title: string, id: number) =>
    ({
      type: 'todolist/todo-reducer/CHANGE-TITLE',
      payload: { title, id },
    }) as const,
  changeTodo: (todo: Todos) =>
    ({ type: 'todolist/todo-reducer/CHANGE-TODO', payload: todo }) as const,
  deleteTodo: (id: number) =>
    ({ type: 'todolist/todo-reducer/DELETE-TODO', payload: id }) as const,
  rerenderApp: (todos: Todos[]) =>
    ({
      type: 'todolist/todo-reducer/RERENDER',
      payload: todos,
    }) as const,
  changeStatus: (status: CaseType, id: number) =>
    ({
      type: 'todolist/todo-reducer/CHANGE-STATUS',
      payload: { status, id },
    }) as const,
};

export default todoReducer;

type InitialStateType = typeof initialState;
type ActionsTypes = ReturnType<Types<typeof actions>>;
