import { Route, Routes, useLocation } from "react-router-dom";
import { getLangFromPath } from "@/i18n/routing";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";

const NotFoundRoute = () => {
  const location = useLocation();
  return <NotFound initialLang={getLangFromPath(location.pathname)} />;
};

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index initialLang="el" />} />
    <Route path="/en" element={<Index initialLang="en" />} />
    <Route path="*" element={<NotFoundRoute />} />
  </Routes>
);
