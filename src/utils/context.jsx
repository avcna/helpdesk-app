import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  //const isAnyToken = JSON.parse(localStorage.getItem("token"));
  //const [authToken, setAuthToken] = useState(isAnyToken);
  const userRole = JSON.parse(localStorage.getItem("role"));
  const userName = JSON.parse(localStorage.getItem("name"));
  const userEmail = JSON.parse(localStorage.getItem("email"));

  const [role, setRole] = useState(userRole);
  const [email, setEmail] = useState(userEmail);
  const [name, setName] = useState(userName);

  const setAndGetTokens = (role, email, name) => {
    //localStorage.setItem("token", JSON.stringify(token));
    //setAuthToken(token);
    localStorage.setItem("role", JSON.stringify(role));
    localStorage.setItem("email", JSON.stringify(email));
    localStorage.setItem("name", JSON.stringify(name));
    setRole(role);
    setEmail(email);
    setName(name);
  };
  return (
    <AuthContext.Provider value={{ setAndGetTokens, role, email, name }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
