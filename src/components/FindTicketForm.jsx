import React from "react";
import { NavLink } from "react-router-dom";
import { Input, SubmitBtn } from "./FormComponents";
import { useTranslation } from "react-i18next";

export const FindTicketForm = ({ onSubmit, setTicketId, ticketId }) => {
  const { t } = useTranslation("find-ticket");
  return (
    <form action="" onSubmit={onSubmit} className="w-[300px]">
      <h3>{t("check-ticket-status")}</h3>
      <Input
        label={t("ticket-id")}
        onChange={(e) => setTicketId(e.target.value)}
        value={ticketId}
      />
      <SubmitBtn />
      <p className="text-[14px]">
        {t("still-need-help")}
        <span
          onClick={() => (window.location.href = "/create-ticket")}
          className="font-semibold text-[#646cff]"
        >
          {" "}
          {t("create-another-ticket")}
        </span>
      </p>
    </form>
  );
};
