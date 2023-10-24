import { combineReducers, createStore } from 'redux';
import todoReducer from './todoReducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const reducer = combineReducers({
  todo: todoReducer,
});

type RootReducerType = typeof reducer;
export type StateType = ReturnType<RootReducerType>;

export type Types<T> = T extends { [key: string]: infer U } ? U : never;

function saveToLocalStorage(state: StateType) {
  try {
    const serialisedState = JSON.stringify(state);
    sessionStorage.setItem('tasks', serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serialisedState = sessionStorage.getItem('tasks');
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

const store = createStore(reducer, loadFromLocalStorage());

store.subscribe(() => saveToLocalStorage(store.getState()));

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector;

export default store;
