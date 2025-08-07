import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import User from "../features/users/user";
import KanbanLogin from "../pages/Login"; // ← Updated login component
import ItemListPage from "../features/itemMaster/itemList";
import SupplierListPage from "../features/supplierMaster/supplierList"; // Assuming this is the correct import for supplier master
import StockStatus from "../features/stockStatus/stockStatusList"; // Assuming this is the correct import for stock status
import SalesOrderPage from "../features/SalesOrder/SalesOrder"; // Assuming this is the correct import for sales order

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      {/* Login Page (Landing) */}
      <Route path="/" element={<ItemListPage />} />

      {/* Main Layout Routes (Protected Pages) */}
      <Route element={<MainLayout />}>
        <Route path="/app/home" element={<MainLayout />} />
        <Route path="/about" element={<About />} />
        <Route path="/app/user" element={<User />} />
        <Route path="/app/itemMaster" element={<ItemListPage />} />
        <Route path="/app/bpmaster" element={<SupplierListPage />} />
        <Route path="/app/salesorder" element={<SalesOrderPage />} />
        <Route path="/app/stockstatus" element={<StockStatus />} />
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
