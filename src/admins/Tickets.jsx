import React, { useEffect, useState } from "react";
import BaseLayout from "../components/BaseLayout";
import {
  getAllTickets,
  getSortedTickets,
  getTicketsByStatus,
} from "../api/tickets";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FilterPopup, SortPopup } from "../components/Popup";
import { useTranslation } from "react-i18next";

const Tickets = () => {
  const { t } = useTranslation("tickets");
  const navigate = useNavigate();
  let { unresolved } = useParams();
  const [tickets, setTickets] = useState([]);
  const [sortVis, setSortVis] = useState(false);
  const [filterVis, setFilterVis] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 10;

  const getAllTicketsList = () => {
    try {
      const res = getAllTickets(setTickets);
      //console.log(tickets);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTicketsListLocation = () => {
    try {
      const res = getTicketsByStatus(setTickets, "unresolved");
      //console.log(tickets);
    } catch (error) {
      console.log(error);
    }
  };
  const times = (time) => {
    const date = new Date(time.seconds * 1000 + time.nanoseconds / 1000000);

    // Format tanggal dd/mm/yyyy
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };
  useEffect(() => {
    if (unresolved === "unresolved") {
      getAllTicketsListLocation();
    } else {
      getAllTicketsList();
    }
    console.log(tickets);
  }, []);

  const goToDetail = (id) => {
    window.location.href = `/ticket/${id}`;
  };
  const totalPages = Math.ceil(tickets.length / ticketsPerPage);
  let currentTickets = tickets.slice(
    (currentPage - 1) * ticketsPerPage,
    currentPage * ticketsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <BaseLayout pageTitle={t("tickets")}>
      {sortVis && <SortPopup setTicket={setTickets} />}
      {filterVis && <FilterPopup setTicket={setTickets} />}
      <div className="bg-white dark:bg-slate-600 border px-[32px] py-[24px]">
        <div className="flex justify-between w-full mb-10">
          <div className="flex gap-x-5">
            <h3>{t("all-tickets")}</h3>
            {unresolved && unresolved == "unresolved" && (
              <p
                className="text-blue-500"
                onClick={() => {
                  unresolved == null;
                  getAllTicketsList();
                  navigate("/tickets");
                }}
              >
                {" "}
                {t("show-all")}
              </p>
            )}
          </div>

          <div className="w-[400px] flex justify-between dark:text-slate-700">
            <button onClick={() => setSortVis(!sortVis)}>{t("sort")}</button>
            <button onClick={() => setFilterVis(!filterVis)}>
              {t("filter")}
            </button>
            <button onClick={() => (window.location.href = "/create-ticket")}>
              {t("new")}
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr className="text-left border-b-2 border-gray-300">
              <th className="w-[250px] px-2">{t("ticket-details")}</th>
              <th className="w-[200px] px-2">{t("customer-name")}</th>
              <th className="w-[150px] px-2">{t("created-at")}</th>
              <th className="w-[150px] px-2">{t("priority")}</th>
              <th className="w-[100px] px-2">{t("status")}</th>
            </tr>
          </thead>
          <tbody>
            {currentTickets.map((ticket, i) => {
              let priority = "";
              switch (ticket.priority) {
                case 1:
                  priority = t("high");
                  break;
                case 2:
                  priority = t("normal");
                  break;
                case 3:
                  priority = t("low");
                  break;
                default:
                  priority = "";
              }
              let waktu = times(ticket.timestamp);
              return (
                <tr key={i} className="border-b">
                  <td className="w-[250px] px-2 py-4">{ticket.subject}</td>
                  <td className="w-[200px] px-2 py-4">{ticket.name}</td>
                  <td className="w-[150px] px-2 py-4">{waktu}</td>
                  <td className="w-[100px] px-2 py-4">{priority}</td>
                  <td className="w-[150px] px-2 py-4">{ticket.status}</td>
                  <td className="w-[100px] px-2 py-4 ">
                    <button
                      className="px-2 py-1 dark:text-slate-700"
                      onClick={() => goToDetail(ticket.id)}
                    >
                      {t("details")}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-center w-full pt-5">
          <div className="flex gap-x-3 dark:text-slate-700">
            <button onClick={handlePreviousPage} hidden={currentPage === 1}>
              Previous
            </button>
            <button
              onClick={handleNextPage}
              hidden={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Tickets;
