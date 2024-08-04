import React, { useEffect, useState } from "react";
import { FindTicketForm } from "../components/FindTicketForm";
import TicketDetails from "../components/TicketDetails";
import { useParams } from "react-router-dom";
import { getTicketById } from "../api/tickets";
import Buttons from "../components/Buttons";

const Detail = () => {
  const [ticket, setTicket] = useState({});
  let { id } = useParams();
  const getDetail = async () => {
    const res = await getTicketById(id);
    setTicket(res);
  };
  useEffect(() => {
    getDetail();
  }, []);
  return (
    <section className="lg:p-[32px] md:p-[32px] p-4 py-8 grid lg:grid-cols-3 md:grid-cols-3 grid-flow-row dark:bg-slate-700 dark:text-white min-h-screen">
      <Buttons />
      <TicketDetails
        subject={ticket?.subject}
        id={ticket?.id}
        date={ticket?.date}
        name={ticket?.name}
        status={ticket?.status}
        description={ticket?.description}
        response={ticket?.response}
        progress={ticket.progress}
      />
      <div className="px-[52px] py-[32px]">
        <FindTicketForm />
      </div>
    </section>
  );
};

export default Detail;
