import React from "react";
import { getSortedTickets, getTicketsByStatus } from "../api/tickets";

export const SortPopup = ({ setTicket }) => {
  const sort = (val) => {
    const res = getSortedTickets(setTicket, val);
  };
  return (
    <div className="absolute top-[130px] right-[350px] grid grid-flow-row w-[150px] bg-white border rounded-lg">
      <div
        onClick={() => sort("desc")}
        className="w-full py-2 border-b hover:cursor-pointer hover:bg-[#f7f8fc]"
      >
        <p className="text-center">low to high</p>{" "}
      </div>
      <div
        onClick={() => sort("asc")}
        className="w-full py-2 hover:cursor-pointer hover:bg-[#f7f8fc]"
      >
        <p className="text-center">high to low</p>
      </div>
    </div>
  );
};

export const FilterPopup = ({ setTicket }) => {
  const filter = (val) => {
    const res = getTicketsByStatus(setTicket, val);
  };
  return (
    <div className="absolute top-[130px] right-[180px] grid grid-flow-row w-[150px] bg-white border rounded-lg">
      <div
        onClick={() => filter("open")}
        className="w-full py-2 border-b hover:cursor-pointer hover:bg-[#f7f8fc]"
      >
        <p className="text-center">Open</p>{" "}
      </div>
      <div
        onClick={() => filter("resolved")}
        className="w-full py-2 border-b hover:cursor-pointer hover:bg-[#f7f8fc]"
      >
        <p className="text-center">Resolved</p>{" "}
      </div>
      <div
        onClick={() => filter("overdue")}
        className="w-full py-2 hover:cursor-pointer hover:bg-[#f7f8fc] border-b"
      >
        <p className="text-center">Overdue</p>
      </div>
      <div
        onClick={() => filter("onHold")}
        className="w-full py-2 hover:cursor-pointer hover:bg-[#f7f8fc] border-b"
      >
        <p className="text-center">On Hold</p>
      </div>
      <div
        onClick={() => filter("unresolved")}
        className="w-full py-2 hover:cursor-pointer hover:bg-[#f7f8fc] border-b"
      >
        <p className="text-center">Unresolved</p>
      </div>
      <div
        onClick={() => filter("rejected")}
        className="w-full py-2 hover:cursor-pointer hover:bg-[#f7f8fc]"
      >
        <p className="text-center">Rejected</p>
      </div>
    </div>
  );
};
