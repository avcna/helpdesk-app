import React, { useEffect, useState } from "react";
import TicketCountCard from "../components/TicketCountCard";
import Chart from "../components/Chart";
import {
  getAllTicketCount,
  getTicketByProgressCount,
  getTicketByStatusCount,
  getTicketsCountForMonth,
} from "../api/tickets";
import BaseLayout from "../components/BaseLayout";
import { FaCirclePlus } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Overview = () => {
  const { t } = useTranslation("overview");
  let navigate = useNavigate();
  const [ticketStatusCount, setTicketStatusCount] = useState({
    unresolved: 0,
    open: 0,
    onHold: 0,
    overdue: 0,
  });
  const [progress, setProgress] = useState({
    feature: 0,
    dev: 0,
    pending: 0,
  });
  const [monthlyTicketCount, setMonthlyTicketCount] = useState([]);
  const [ticketTotal, setTicketTotal] = useState(0);
  const [ticketAvg, setTicketAvg] = useState(0);

  const getStatusCount = async (status) => {
    const res = await getTicketByStatusCount(status);
    setTicketStatusCount((prevState) => ({ ...prevState, [status]: res }));
  };
  const getProgressCount = async (progress) => {
    const res = await getTicketByProgressCount(progress);
    if (progress == "Waiting on feature request") {
      setProgress((prevState) => ({ ...prevState, feature: res }));
    }
    if (progress == "Awaiting developer fix") {
      setProgress((prevState) => ({ ...prevState, dev: res }));
    }
    if (progress == "Pending") {
      setProgress((prevState) => ({ ...prevState, pending: res }));
    }
  };
  const getTicketCountPerMonth = async () => {
    let array = [];
    try {
      for (let i = 1; i <= 12; i++) {
        const res = await getTicketsCountForMonth(i);
        array.push(res);
      }
      setMonthlyTicketCount([...array]);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllTicketsSize = async () => {
    try {
      const res = await getAllTicketCount();
      setTicketTotal(res);
    } catch (error) {
      console.log(error);
    }
  };

  const avg = () => {
    getTicketCountPerMonth();
    const sum = monthlyTicketCount.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    let res = Math.floor(sum / 12);
    setTicketAvg(res);
  };
  useEffect(() => {
    getStatusCount("open");
    getStatusCount("onHold");
    getStatusCount("overdue");
    getStatusCount("closed");
    getStatusCount("rejected");
    getAllTicketsSize();
    avg();
    getTicketCountPerMonth();
    getProgressCount("Waiting on feature request");
    getProgressCount("Awaiting developer fix");
    getProgressCount("Pending");
  }, []);
  const viewUnresolved = () => {
    window.location.href = "/tickets/unresolved";
  };
  return (
    <BaseLayout pageTitle={t("overview")}>
      <div className="flex justify-between w-full">
        <TicketCountCard
          status={t("unresolved")}
          total={
            ticketStatusCount.overdue +
            ticketStatusCount.open +
            ticketStatusCount.onHold
          }
        />
        <TicketCountCard
          status={t("overdue")}
          total={ticketStatusCount.overdue}
        />
        <TicketCountCard status={t("open")} total={ticketStatusCount.open} />
        <TicketCountCard
          status={t("on-hold")}
          total={ticketStatusCount.onHold}
        />
      </div>
      <Chart
        arr={monthlyTicketCount}
        resolved={ticketStatusCount.closed}
        rejected={ticketStatusCount.rejected}
        received={ticketTotal}
        avg={ticketAvg}
      />
      <div className="grid grid-cols-2 gap-x-5">
        <div className="bg-white border dark:bg-slate-600">
          <p className="flex justify-between mx-6 mt-4">
            <span className="font-bold text-[18px]">
              {t("unresolved-tickets")}
            </span>
            <span
              className="text-[#3c2294] font-semibold"
              onClick={viewUnresolved}
            >
              {t("view-all")}
            </span>
          </p>
          <p className="mb-[40px] mx-6 mt-4">{t("by-progress")}</p>
          <div className="px-6 py-3 border-t gap-x-3">
            <p className="flex justify-between">
              <span>{t("waiting-on-feature-request")}</span>
              <span>{progress.feature}</span>
            </p>
          </div>
          <div className="px-6 py-3 border-t gap-x-3">
            <p className="flex justify-between">
              <span>{t("awaiting-developer-fix")}</span>
              <span>{progress.dev}</span>
            </p>
          </div>
          <div className="px-6 py-3 border-t gap-x-3">
            <p className="flex justify-between">
              <span>{t("pending")}</span>
              <span>{progress.pending}</span>
            </p>
          </div>
        </div>
        <div className="bg-white border dark:bg-slate-600">
          <p className="flex justify-between mx-6 mt-4 mb-2">
            <span className="font-bold text-[18px]">{t("task")}</span>
            <span className="text-[#3c2294] font-semibold">
              {t("view-all")}
            </span>
          </p>
          <p className="mx-6 my-2">{t("today")}</p>
          <div className="flex justify-between px-6 py-2">
            <input
              placeholder={t("create")}
              className="w-[90%] outline-none  bg-transparent "
            />
            <button className="p-0 m-0 border-none focus:outline-none dark:bg-transparent">
              <FaCirclePlus className="text-[20px]" />
            </button>
          </div>
          <div className="flex px-6 py-2 border-t gap-x-3">
            <div className="pt-1">
              <FaCheckCircle className="text-[20px]" />
            </div>
            <div className="w-full">Tesss</div>
          </div>

          <div className="flex px-6 py-2 border-t gap-x-3">
            <div className="pt-1">
              <MdOutlineRadioButtonUnchecked className="text-[24px]" />
            </div>
            <div className="w-full">Tesss</div>
          </div>

          <div className="flex px-6 py-2 border-t gap-x-3">
            <div className="pt-1">
              <FaCheckCircle className="text-[20px]" />
            </div>
            <div className="w-full">Tesss</div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Overview;
