
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import InvestorDashboard from "./pages/InvestorDashboard";
import NotFound from "./pages/NotFound";
import Investments from "./pages/Investments";
import InvestmentDetail from "./pages/InvestmentDetail";
import Proposals from "./pages/Proposals";
import Admin from "./pages/Admin";
import Calendar from "./pages/Calendar";
import ManageInvestors from "./pages/ManageInvestors";
import CreateInvestment from "./pages/CreateInvestment";

const queryClient = new QueryClient();

const App = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  // Auth Guards
  const RequireAuth = ({ children }: { children: JSX.Element }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const RequireAdmin = ({ children }: { children: JSX.Element }) => {
    if (!isAuthenticated || !isAdmin) {
      return <Navigate to="/" />;
    }
    return children;
  };

  // Redirect if already authenticated
  const RedirectIfAuthenticated = ({ children }: { children: JSX.Element }) => {
    if (isAuthenticated) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/landing" element={<Landing />} />
            <Route path="/login" element={
              <RedirectIfAuthenticated>
                <Login />
              </RedirectIfAuthenticated>
            } />
            <Route path="/register" element={
              <RedirectIfAuthenticated>
                <Register />
              </RedirectIfAuthenticated>
            } />
            
            {/* Protected Investor routes */}
            <Route path="/" element={
              <RequireAuth>
                <InvestorDashboard />
              </RequireAuth>
            } />
            <Route path="/investments" element={
              <RequireAuth>
                <Investments />
              </RequireAuth>
            } />
            <Route path="/investments/:type" element={
              <RequireAuth>
                <Investments />
              </RequireAuth>
            } />
            <Route path="/investments/:type/:id" element={
              <RequireAuth>
                <InvestmentDetail />
              </RequireAuth>
            } />
            <Route path="/proposals" element={
              <RequireAuth>
                <Proposals />
              </RequireAuth>
            } />
            <Route path="/calendar" element={
              <RequireAuth>
                <Calendar />
              </RequireAuth>
            } />
            
            {/* Protected Admin routes */}
            <Route path="/admin" element={
              <RequireAdmin>
                <Admin />
              </RequireAdmin>
            } />
            <Route path="/admin/investors" element={
              <RequireAdmin>
                <ManageInvestors />
              </RequireAdmin>
            } />
            <Route path="/admin/calendar" element={
              <RequireAdmin>
                <Calendar />
              </RequireAdmin>
            } />
            <Route path="/admin/create-investment" element={
              <RequireAdmin>
                <CreateInvestment />
              </RequireAdmin>
            } />
            <Route path="/admin/*" element={
              <RequireAdmin>
                <Admin />
              </RequireAdmin>
            } />
            
            {/* Redirect to landing page if not authenticated */}
            <Route path="" element={isAuthenticated ? <Navigate to="/" /> : <Navigate to="/landing" />} />
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
