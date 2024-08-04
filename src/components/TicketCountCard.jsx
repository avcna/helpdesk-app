import React from "react";

const TicketCountCard = ({ status, total }) => {
  return (
    <div className="py-4 w-[230px] border-2 border-gray-100 bg-white dark:bg-slate-600 rounded-lg">
      <h3 className="text-center">{status}</h3>
      <h1 className="text-center">{total}</h1>
    </div>
  );
};

export default TicketCountCard;
