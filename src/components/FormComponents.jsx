import React from "react";

export const Input = ({ label, type = "text", onChange, value }) => {
  return (
    <section>
      <label htmlFor="" className="dark:text-white">
        {label}
      </label>
      <br />
      <input
        type={type}
        name=""
        id=""
        className="w-full bg-gray-100 border border-none rounded-lg dark:text-slate-700"
        onChange={onChange}
        value={value}
      />
    </section>
  );
};

export const SubmitBtn = ({ text = "Submit" }) => {
  return (
    <button
      type="submit"
      className="w-full my-3 bg-gray-100 dark:text-slate-700"
    >
      {text}
    </button>
  );
};
