import React, { useState, useContext } from "react";
import { Input, SubmitBtn } from "../components/FormComponents";
import { AuthContext } from "../utils/context";
import { postTicket } from "../api/tickets";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Buttons from "../components/Buttons";

const CreateTicket = () => {
  const { t } = useTranslation("create-ticket");
  const { name, email, role } = useContext(AuthContext);
  const [newTicket, setNewTicket] = useState({
    subject: "",
    description: "",
    name: name,
    email: email,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(newTicket);
    try {
      const res = await postTicket(newTicket);
      console.log(res);
      alert(t("please-save") + res);
      setNewTicket({ ...newTicket, subject: "", description: "" });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="flex items-center justify-center w-full h-screen dark:bg-slate-700 dark:text-white">
      <Buttons />
      <form action="" onSubmit={handleSubmit} className="w-[300px]">
        <h3>{t("create-new-ticket")}</h3>
        <Input
          label={t("subject")}
          onChange={(e) =>
            setNewTicket({ ...newTicket, subject: e.target.value })
          }
          value={newTicket.subject}
        />
        <Input
          label={t("description")}
          onChange={(e) =>
            setNewTicket({ ...newTicket, description: e.target.value })
          }
          value={newTicket.description}
        />
        <SubmitBtn />

        <p className="text-[14px]">
          {t("already-create-ticket")}
          <span
            onClick={() => (window.location.href = "/find-ticket")}
            className="text-[#646cff] font-semibold"
          >
            {" "}
            {t("check-ticket-status")}
          </span>
        </p>
      </form>
    </section>
  );
};

export default CreateTicket;
