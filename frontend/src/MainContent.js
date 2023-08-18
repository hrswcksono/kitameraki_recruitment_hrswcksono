import React from "react";
import { Routes, Route } from "react-router-dom";
import Page from "./Page";

const MainContent = () => {
  return (
    <div className="w-full grid justify-items-stretch">
      <Routes>
        <Route path="" element={<Page></Page>}></Route>
      </Routes>
    </div>
  );
};

export default MainContent;
