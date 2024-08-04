import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { CgProfile } from "react-icons/cg";
import { FaGlobe } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { CgDarkMode } from "react-icons/cg";
import Buttons from "./Buttons";
import { GiHamburgerMenu } from "react-icons/gi";

const BaseLayout = ({ children, pageTitle }) => {
  const [isNav, setIsNav] = useState(false);
  const { i18n } = useTranslation();

  const changeLanguage = () => {
    const currLng = localStorage.getItem("i18nextLng") || "en-US";
    if (currLng == "id-ID") {
      i18n.changeLanguage("en-US");
      localStorage.setItem("i18nextLng", "en-US");
    } else {
      i18n.changeLanguage("id-ID");
      localStorage.setItem("i18nextLng", "id-ID");
    }
  };

  const handleDarkMode = () => {
    const htmlElement = document.documentElement;
    if (htmlElement.classList.contains("dark")) {
      htmlElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      htmlElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  useEffect(() => {
    changeLanguage();
  }, []);
  return (
    <section className="flex w-full">
      <Navbar isNav={isNav} setIsNav={setIsNav} />
      <section className="flex flex-col w-full py-6 px-6 gap-y-6 bg-[#f7f8fc] dark:bg-slate-700 dark:text-white">
        <div className="flex justify-between lg:block md:block">
          <div className="bg-transparent" onClick={() => setIsNav(!isNav)}>
            <GiHamburgerMenu className="lg:hidden md:hidden text-[24px] dark:text-white" />
          </div>
          <h3>{pageTitle}</h3>
          <Buttons />
        </div>
        {children}
      </section>
    </section>
  );
};

export default BaseLayout;
