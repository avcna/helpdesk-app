import React, { useEffect, useState } from "react";
import { editTicket, getTicketById } from "../api/tickets";
import { useParams } from "react-router-dom";
import { Input, SubmitBtn } from "../components/FormComponents";
import TicketDetails from "../components/TicketDetails";
import { useTranslation } from "react-i18next";

const DetailTicket = () => {
  const { t } = useTranslation("form-update");
  const [ticket, setTicket] = useState({});
  const [editedTicket, setEditedTicket] = useState({
    response: "",
    status: "",
    priority: 2,
    progress: "",
    reject: false,
  });
  let { id } = useParams();
  const getDetail = async () => {
    const res = await getTicketById(id);
    setTicket(res);
    setEditedTicket({
      response: res.response,
      status: res.status,
      priority: res.priority,
      progress: res.progress,
      reject: res.reject,
    });
  };
  useEffect(() => {
    getDetail();
  }, []);
  const updateTicket = async (e) => {
    e.preventDefault();
    try {
      const res = await editTicket(id, editedTicket);
      getDetail();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="p-[32px] grid lg:grid-cols-3 md:grid-cols-3 grid-flow-row dark:text-[#ffffff] dark:bg-slate-700 min-h-screen">
      <TicketDetails
        subject={ticket?.subject}
        id={ticket?.id}
        date={ticket?.date}
        name={ticket?.name}
        status={ticket?.status}
        description={ticket?.description}
        response={ticket?.response}
        progress={ticket?.progress}
        priority={ticket?.priority}
      />
      <div className="px-[52px] py-[32px]">
        <form action="" onSubmit={updateTicket} className="dark:text-slate-700">
          <Input
            label={t("response")}
            onChange={(e) =>
              setEditedTicket({ ...editedTicket, response: e.target.value })
            }
            value={editedTicket.response}
          />
          <label htmlFor="" className="dark:text-white">
            {"Status"}
          </label>
          <br />
          <select
            name=""
            id=""
            className="w-full border border-red-500"
            onChange={(e) =>
              setEditedTicket({ ...editedTicket, status: e.target.value })
            }
            value={editedTicket?.status}
          >
            <option value="" disabled hidden></option>
            <option value="open">{t("open")}</option>
            <option value="overdue">{t("overdue")}</option>
            <option value="onHold">{t("onHold")}</option>
            <option value="resolved">{t("closed")}</option>
          </select>
          <label htmlFor="" className="dark:text-white">
            {t("priority")}
          </label>
          <br />
          <select
            name=""
            id=""
            className="w-full border border-red-500"
            onChange={(e) =>
              setEditedTicket({ ...editedTicket, priority: e.target.value })
            }
            value={editedTicket?.priority}
          >
            <option value="" disabled hidden></option>
            <option value={1}>{t("high")}</option>
            <option value={2}>{t("normal")}</option>
            <option value={3}>{t("low")}</option>
          </select>
          <label htmlFor="" className="dark:text-white">
            {t("progress")}
          </label>
          <br />
          <select
            name=""
            id=""
            className="w-full border border-red-500"
            onChange={(e) =>
              setEditedTicket({ ...editedTicket, progress: e.target.value })
            }
            value={editedTicket?.progress}
          >
            <option value="" disabled hidden></option>
            <option value={"Waiting on feature request"}>
              {t("waitingOnFeatureRequest")}
            </option>
            <option value={"Awaiting developer fix"}>
              {t("awaitingDeveloperFix")}
            </option>
            <option value={"Pending"}>{t("pending")}</option>
          </select>
          <label htmlFor="" className="dark:text-white">
            {t("rejectThisTicket")}
          </label>
          <br />
          <input
            type="radio"
            //value={editedTicket.reject}
            id="reject"
            name="reject"
            checked={editedTicket.reject === true}
            onChange={(e) =>
              setEditedTicket({
                ...editedTicket,
                reject: true,
              })
            }
          />{" "}
          <label htmlFor="reject" className="dark:text-white">
            {t("yes")}
          </label>
          <br />
          <input
            type="radio"
            //value={editedTicket.reject}
            id="not-reject"
            name="reject"
            checked={editedTicket.reject === false}
            onChange={(e) =>
              setEditedTicket({
                ...editedTicket,
                reject: false,
              })
            }
          />{" "}
          <label htmlFor="not-reject" className="dark:text-white">
            {t("no")}
          </label>
          <SubmitBtn text={t("update")} />
        </form>
      </div>
    </section>
  );
};

export default DetailTicket;
