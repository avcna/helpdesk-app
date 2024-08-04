import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Input, SubmitBtn } from "../components/FormComponents";
import { FindTicketForm } from "../components/FindTicketForm";
import { getTicketById } from "../api/tickets";
import { useNavigate } from "react-router-dom";
import Buttons from "../components/Buttons";

const FindTicket = () => {
  let navigate = useNavigate();
  const [ticketId, setTicketId] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await getTicketById(ticketId);
      if (res) {
        navigate(`/find-ticket/${ticketId}`);
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <section className="flex items-center justify-center w-full h-screen dark:bg-slate-700 dark:text-white">
      <Buttons />
      <FindTicketForm
        onSubmit={handleSubmit}
        setTicketId={setTicketId}
        ticketId={ticketId}
      />
    </section>
  );
};

export default FindTicket;
