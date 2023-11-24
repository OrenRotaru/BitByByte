import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

/**
 * Custom hook that returns the authentication context.
 * @returns The authentication context.
 * @throws {Error} If used outside of an AuthContextProvider.
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
};
