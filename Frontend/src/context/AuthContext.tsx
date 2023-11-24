/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useReducer, useEffect } from "react";

interface AuthContextType {
  user: any;
  dispatch: React.Dispatch<Action>;
}
export const AuthContext = createContext<AuthContextType>({
  user: null,
  dispatch: () => {},
});

interface State {
  user: any;
}

interface Action {
  type: string;
  payload?: any;
}

export const authReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

interface AuthContextProviderProps {
  children: React.ReactNode;
}

/**
 * Provides authentication context for the application.
 * @param children - The child components to be wrapped by the AuthContextProvider.
 * @returns The AuthContextProvider component.
 */
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  useEffect(() => {
    const userItem = localStorage.getItem("user");
    if (userItem !== null) {
      const user = JSON.parse(userItem);
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
