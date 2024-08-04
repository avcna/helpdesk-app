import React from "react";
import { useTranslation } from "react-i18next";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = ({ isNav, setIsNav }) => {
  const { t } = useTranslation("navbar");
  const menu = [
    {
      name: t("overview"),
      endpoint: "/overview",
    },
    { name: t("tickets"), endpoint: "/tickets" },
    { name: t("ideas"), endpoint: "" },
    { name: t("contacts"), endpoint: "" },
    { name: t("agents"), endpoint: "" },
    { name: t("articles"), endpoint: "" },
    { name: t("settings"), endpoint: "" },
    { name: t("subscription"), endpoint: "" },
  ];
  return (
    <div
      className={`h-screen bg-slate-600 text-white lg:w-[250px] md:lg:w-[250px] w-[170px] flex flex-col lg:sticky md:sticky absolute top-0 ${
        isNav ? "block" : "hidden"
      } lg:block md:block lg:relative md:relative`}
    >
      <h3 className="flex justify-between px-3 my-5 text-center">
        <span>Dashboard Kit</span>
        <span>
          {" "}
          <div className="bg-transparent" onClick={() => setIsNav(!isNav)}>
            <GiHamburgerMenu className="lg:hidden md:hidden text-[24px] dark:text-white" />
          </div>
        </span>
      </h3>
      {menu?.map((item, i) => (
        <div
          key={i}
          className="px-[28px] py-3 text-white hover:cursor-pointer"
          onClick={() => (window.location.href = item.endpoint)}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default Navbar;
