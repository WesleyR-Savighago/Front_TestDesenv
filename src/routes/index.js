import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ListPage from "../pages/listPage/ListPage";
import HomeView from "../pages/homePage/HomeView";
import EditPage from "../pages/editPage/editar";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/listar" element={<ListPage />} />
      <Route path="/editar/:id" element={<EditPage />} />
    </Routes>
  </Router>
);

export default AppRoutes;
