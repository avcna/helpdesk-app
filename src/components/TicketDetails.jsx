import React from "react";
import { useTranslation } from "react-i18next";

const TicketDetails = ({
  subject,
  id,
  date,
  name,
  status,
  description,
  response,
  progress,
  priority,
}) => {
  const { t, i18n } = useTranslation("ticket-details");
  let priorityText = "";
  switch (priority) {
    case 1:
      priorityText = t?.("high");
      break;
    case 2:
      priorityText = t?.("normal");
      break;
    case 3:
      priorityText = t?.("low");
      break;
    default:
      priorityText = t?.("normal");
  }
  return (
    <div className="w-full lg:h-screen md:h-screen rounded drop-shadow-md lg:px-[52px] md:px-[52px] px-[12px] py-[32px] lg:col-span-2 md:col-span-2">
      <div className="flex justify-between">
        <h2 className="font-bold text-[24px]">{subject}</h2>
        <p
          className={`p-2 border-2 text-[12px] rounded-lg ${
            priority == 1 && "border-red-500 text-red-500"
          } ${priority == 2 && "border-green-500 text-green-500"} ${
            priority == 3 && "border-yellow-500 text-yellow-500"
          }
                `}
        >
          {priorityText}
        </p>
      </div>
      <p className="font-semibold">{t("ticket-details")}</p>
      <p className="flex justify-between text-[14px]">
        <span className="text-blue-400">{t?.("ticket-id")}</span>
        <span>{id}</span>
      </p>
      <p className="flex justify-between text-[14px]">
        <span className="text-blue-400">{t?.("date-submitted")}</span>
        <span>{date}</span>
      </p>
      <p className="flex justify-between text-[14px]">
        <span className="text-blue-400">{t?.("submitted-by")}</span>
        <span>{name}</span>
      </p>
      <p className="flex justify-between text-[14px]">
        <span className="text-blue-400">Status</span>
        <span>{status}</span>
      </p>
      <p className="flex justify-between text-[14px]">
        <span className="text-blue-400">{t?.("progress")}</span>
        <span>{progress}</span>
      </p>
      <p className="my-5">{description}</p>
      <div>
        <p className="font-semibold">{t?.("response")}</p>
        <p className="">{response}</p>
      </div>
    </div>
  );
};

export default TicketDetails;
