import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const language = localStorage.getItem("i18nextLng") || "en";

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: language,
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    backend: {
      // Jalur relatif ke file terjemahan dalam direktori public
      loadPath: "/locales/{{lng}}/{{ns}}.json",
      ns: [
        "navbar",
        "tickets",
        "auth",
        "find-ticket",
        "create-ticket",
        "ticket-details",
        "form-update",
      ],
      defaultNS: "navbar",
    },
  });

export default i18n;
