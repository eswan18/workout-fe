'use client';

import { createContext, useContext, Dispatch, useEffect, useReducer } from 'react';
import getCurrentUser from '@/app/_actions/getCurrentUser';

type State = {
  user: string | undefined;
}
type Action = {type: 'setUser', payload: string | undefined};


const initialState: State = {
  user: undefined,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setUser':
      if (!!action.payload && (action.payload != state.user)) {
        return { ...state, user: action.payload };
      } else {
        return state;
      }
    default:
      return state;
  }
}

type GlobalContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

const GlobalContext = createContext<GlobalContextType>(
  {} as GlobalContextType
);

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    getCurrentUser()
      .then((user) => user && dispatch({type: 'setUser', payload: user}))
      .catch((err) => console.log("error fetching initial user:", err));
  }, []);
  console.log("rendering global context provider");

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext);