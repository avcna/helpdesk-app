import React, { useState, useContext, useTransition } from "react";
import { Input, SubmitBtn } from "../components/FormComponents";
import { loginAPI } from "../api/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/context";
import { getUserByEmail } from "../api/users";
import { useTranslation } from "react-i18next";
import Buttons from "../components/Buttons";

const Login = () => {
  const { t } = useTranslation("auth");
  const { setAndGetTokens } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [currUser, setCurrUser] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(user);
    try {
      const res = await loginAPI(user.email, user.password);
      try {
        const res = await getUserByEmail(user.email);
        //console.log(res);

        setAndGetTokens(res[0].role, res[0].email, res[0].name);
        setUser({
          email: "",
          password: "",
        });
        if (res[0].role == "admin") {
          navigate("/overview");
        } else {
          navigate("/create-ticket");
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="flex items-center justify-center w-full h-screen dark:bg-slate-700 dark:text-white">
      <Buttons />
      <form action="" onSubmit={handleSubmit} className="w-[300px]">
        <h3>{t("login")}</h3>
        <Input
          label={t("email")}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          type="email"
          value={user.email}
        />
        <Input
          label={t("password")}
          type="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          value={user.password}
        />
        <SubmitBtn />
        <p>
          {t("dont-have-account")}{" "}
          <NavLink to={"/signup"}>{t("signup-action")}</NavLink>
        </p>
      </form>
    </section>
  );
};

export default Login;
