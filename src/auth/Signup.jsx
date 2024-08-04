import React, { useState, useContext } from "react";
import { Input, SubmitBtn } from "../components/FormComponents";
import { registerAPI } from "../api/auth";
import { postUserData } from "../api/users";
import { AuthContext } from "../utils/context";
import { useNavigate, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Buttons from "../components/Buttons";

const Signup = () => {
  const { t } = useTranslation("auth");
  const { setAndGetTokens } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newUser = { name: user.name, email: user.email, role: "user" };
    try {
      const res = await registerAPI(user.email, user.password);
      try {
        const addUser = await postUserData(newUser);
        setAndGetTokens(user.role, user.email, user.name);
        setUser({
          name: "",
          email: "",
          password: "",
        });
        navigate("/create-ticket");
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setUser({ ...user, password });
    setIsPasswordValid(password.length >= 8);
  };
  return (
    <section className="flex items-center justify-center w-full h-screen dark:bg-slate-700 dark:text-white">
      <Buttons />
      <form action="" onSubmit={handleSubmit} className="w-[300px]">
        <h3>{t("sign-up")}</h3>
        <Input
          label={t("name")}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          value={user.name}
        />
        <Input
          label={t("email")}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          type="email"
          value={user.email}
        />
        <Input
          label={t("password")}
          type="password"
          onChange={handlePasswordChange}
          value={user.password}
        />
        {!isPasswordValid && (
          <p style={{ color: "red" }}>
            Password must be at least 8 characters long.
          </p>
        )}
        <SubmitBtn />
        <p>
          {t("already-have-account")}{" "}
          <NavLink to={"/login"}>{t("login-action")}</NavLink>
        </p>
      </form>
    </section>
  );
};

export default Signup;
