import { Routes, Route, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import HomePage from "pages/HomePage";
import AdminPage from "pages/AdminPage";
import AuthPage from "pages/AuthPage";
import DashbordPage from "pages/DashbordPage";
import PageNotFound from "pages/404";
import Loader from "components/templates/modules/Loader";
import { getProfile } from "services/user";



function Router() {
    const { data, isLoading, error } = useQuery(["profile"], getProfile);
    // console.log({ data, isLoading, error });

    if(isLoading) return <Loader/>
    return (
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="/dashbord" element={data ? <DashbordPage /> : <Navigate to="/auth"/>} />
            <Route path="/auth" element={data ? <Navigate to="/dashbord"/> : <AuthPage /> } />
            <Route path="/admin" element={data && data.data.role === "ADMIN" ? ( <AdminPage /> ) : ( <Navigate to="/"/>)} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}

export default Router