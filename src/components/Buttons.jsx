import React, { useState } from "react";
import { CgProfile, CgDarkMode } from "react-icons/cg";
import { FaGlobe } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";

const Buttons = () => {
  const [logoutPopup, setLogoutPopup] = useState(false);
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

  const logout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    setLogoutPopup(!logoutPopup);
    i18n.changeLanguage("en-US");
    localStorage.setItem("i18nextLng", "en-US");
    window.location.href = "/login";
  };

  return (
    <div className="lg:absolute md:absolute top-[24px] right-[50px] z-20">
      {logoutPopup && (
        <div
          className="absolute top-[30px] bg-white right-[-18px] border rounded hover:cursor-pointer px-2 dark:text-slate-700"
          onClick={logout}
        >
          Logout
        </div>
      )}
      <div className="flex gap-8">
        <CgDarkMode className="text-[24px]" onClick={handleDarkMode} />
        <FaGlobe className="text-[24px]" onClick={changeLanguage} />
        {localStorage.getItem("role") && (
          <CgProfile
            className="text-[24px]"
            onClick={() => setLogoutPopup(!logoutPopup)}
          />
        )}
      </div>
    </div>
  );
};

export default Buttons;
