import { useReducer } from 'react';
import createUseContext from 'constate';
import { User } from '../interfaces/User';

const initUser: User = {
  name: 'Guest',
  status: ''
}

const reducerFn = (state: any, action: any) => {
  return reducers[action.type](state, action);
}

const reducers: any = {
  'CHANGE_NAME': (state: any, action: any) => ({
    ...state,
    name: action.payload
  })
}

function useUser() {
  const [user, dispatch]: [User, Function] = useReducer(reducerFn, initUser);
  const changeName = (newName: any) => {
    dispatch({ type: 'CHANGE_NAME', payload: newName })
  }
  return { user, changeName };
}
export const useUserContext = createUseContext(useUser);