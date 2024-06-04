import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import { UserProvider } from "providers/UserContext";
import RequireAuth from "providers/RequireAuth";

const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="admin/*" element={<AdminLayout />} />
        </Route>
        <Route path="auth/*" element={<AuthLayout />} />
        <Route path="/" element={<Navigate to="/auth" replace />} />
      </Routes>
    </UserProvider>
  );
};

export default App;
