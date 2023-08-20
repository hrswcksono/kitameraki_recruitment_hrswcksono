import React from "react";
import { Routes, Route } from "react-router-dom";
import Page from "./pages/Page";
import SettingPage from "./pages/SettingPage";

const MainContent = () => {
  return (
    <div className="w-full grid justify-items-stretch">
      <Routes>
        <Route path="" element={<Page />} />
        <Route path="/setting" element={<SettingPage />} />
      </Routes>
    </div>
  );
};

export default MainContent;
