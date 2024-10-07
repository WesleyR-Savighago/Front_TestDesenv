import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ListPage from "../pages/listPage/ListPage";
import HomeView from "../pages/homePage/HomeView";
import EditPage from "../pages/editPage/editar";
import { FuncionariosProvider } from "../context/FuncionariosContext";

const AppRoutes = () => (
  <Router>
    <FuncionariosProvider>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/listar" element={<ListPage />} />
        <Route path="/editar/:id" element={<EditPage />} />
      </Routes>
    </FuncionariosProvider>
  </Router>
);

export default AppRoutes;
