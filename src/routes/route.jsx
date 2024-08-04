import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../utils/context";

export const UserRestrictedRoute = ({ children }) => {
  const { role } = useContext(AuthContext);
  if (role === "user" || role === "admin") {
    return children;
  } else {
    window.location.href = "/login";
  }
};

export const AdminRestrictedRoute = ({ children }) => {
  const { role } = useContext(AuthContext);
  if (role === "admin") {
    return children;
  } else {
    window.location.href = "/create-ticket";
  }
};
