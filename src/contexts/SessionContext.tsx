import { useReducer } from 'react';
import createUseContext from 'constate';
import { User } from '../classes/User';

interface Session {
  me: User,
  loggedIn: boolean,
  players: User[],
  socket: any
  room: string,
  currentUserView: User
}

let me = new User({
  name: 'Guest',
  status: 'Rolling a d20'
})

const initSession: Session = {
  me: me,
  loggedIn: false,
  players: [],
  socket: null,
  room: '',
  currentUserView: me
}

const reducerFn = (state: any, action: any) => {
  return reducers[action.type](state, action);
}

const reducers: any = {
  'SET_NAME': (state: any, action: any) => ({
    ...state,
    me: { ...state.me, name: action.payload }
  }),
  'SET_STATUS': (state: any, action: any) => ({
    ...state,
    me: { ...state.me, status: action.payload }
  }),
  'SET_PLAYERS': (state: any, action: any) => ({
    ...state,
    players: action.payload
  }),
  'SET_SOCKET': (state: any, action: any) => ({
    ...state,
    socket: action.payload
  }),
  'SET_ROOM': (state: any, action: any) => ({
    ...state,
    room: action.payload
  }),
  'SET_CURRENTUSERVIEW': (state: any, action: any) => ({
    ...state,
    currentUserView: action.payload
  }),
  'LOGIN': (state: any, action: any) => ({
    ...state,
    loggedIn: true
  }),
  'LOGOUT': (state: any, action: any) => ({
    ...initSession
  }),
}

function useSession() {
  const [session, dispatch]: [Session, Function] = useReducer(reducerFn, initSession);
  const setName = (value: any) => { dispatch({ type: 'SET_NAME', payload: value }) }
  const setStatus = (value: any) => { dispatch({ type: 'SET_STATUS', payload: value }) }
  const setPlayers = (value: any) => {dispatch({ type: 'SET_PLAYERS', payload: value })}
  const setRoom = (value: any) => { dispatch({ type: 'SET_ROOM', payload: value }) }
  const setSocket = (value: any) => { value.userId = session.me.id; dispatch({ type: 'SET_SOCKET', payload: value }); }
  const setCurrentUserView = (value: any) => { dispatch({ type: 'SET_CURRENTUSERVIEW', payload: value })}
  const login = () => { dispatch({ type: 'LOGIN' })}
  const logout = () => { dispatch({ type: 'LOGOUT' })}

  const onConnect = (socket: any) => { 
    socket.on('connect', () => {
      socket.emit('joinRoom', { ...session.me, room: session.room })
      console.log('Websocket Connected!');
    });
  }
  const onGetPlayers = (socket: any) => { 
    socket.on('getPlayers', (players: any) => {
      setPlayers(players);
    });
  }

  const removeConnect = (socket: any) => {
    socket.removeListener('connect');
  }
  const removeGetPlayers = (socket: any) => {
    socket.removeListener('getPlayers');
  }

  const checkIfMe = () => {
    return session.me.id === session.currentUserView.id;
  }
  return { 
    session,
    setName,
    setStatus,
    setRoom,
    setSocket,
    setCurrentUserView,
    login,
    logout,
    onConnect,
    onGetPlayers,
    removeConnect,
    removeGetPlayers,
    checkIfMe
  };
}

//////////////////////
// Socket IO Listeners
//////////////////////


export const useSessionContext = createUseContext(useSession);