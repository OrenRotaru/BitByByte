/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useReducer, useEffect, useState } from "react";

interface AuthContextType {
  user: any;
  dispatch: React.Dispatch<Action>;
  loading: boolean;
}
export const AuthContext = createContext<AuthContextType>({
  user: null,
  dispatch: () => {},
  loading: true,
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userItem = localStorage.getItem("user");
    if (userItem !== null) {
      const user = JSON.parse(userItem);

      // fetch the user from the backend to get the profilePic
      const apiUrl = `http://127.0.0.1:5000/api/user/${user.id}`;

      const fetchUser = async () => {
        const response = await fetch(apiUrl, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (response.ok) {
          const json = await response.json();
          dispatch({ type: "LOGIN", payload: { ...user, profilePic: json.profilePic } });
        }
        setLoading(false);
      }
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
