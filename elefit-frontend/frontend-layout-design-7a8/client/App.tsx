import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import Community from "./pages/Community";
import FindExpert from "./pages/FindExpert";
import ApplyExpert from "./pages/ApplyExpert";
import Schedule from "./pages/Schedule";
import Profile from "./pages/Profile";
import AICoachMain from "./pages/AICoach/Main";
import AICoachWelcome from "./pages/AICoach/Welcome";
import AICoachGoal from "./pages/AICoach/Goal";
import AICoachDetails from "./pages/AICoach/Details";
import AICoachPreferences from "./pages/AICoach/Preferences";
import AICoachCalories from "./pages/AICoach/Calories";
import AuthPage from "./pages/Auth/AuthPageOriginal";
import CustomerAuth from "./pages/Auth/CustomerAuth";
import UserDashboard from "./pages/UserDashboardPitchBlack";
import {
  ProtectedRoute,
  PublicRoute,
  UnauthorizedPage,
} from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <div className="min-h-screen pt-0">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/HomePage" element={<HomePage />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />
              
              {/* Authentication Routes */}
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/auth/customer" element={<CustomerAuth />} />
              
              {/* Contact Page */}
              <Route path="/contact" element={<div className="p-8">Contact Page - Coming Soon</div>} />
              
              {/* Grocery List (for EVA customers) */}
              <Route path="/grocery-list" element={<div className="p-8">Grocery List - Coming Soon</div>} />
              
              {/* Protected Routes - AI Coach */}
              <Route
                path="/ai-coach"
                element={
                  <ProtectedRoute>
                    <AICoachMain />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ai-coach/welcome"
                element={
                  <ProtectedRoute>
                    <AICoachWelcome />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ai-coach/goal"
                element={
                  <ProtectedRoute>
                    <AICoachGoal />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ai-coach/details"
                element={
                  <ProtectedRoute>
                    <AICoachDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ai-coach/preferences"
                element={
                  <ProtectedRoute>
                    <AICoachPreferences />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ai-coach/calories"
                element={
                  <ProtectedRoute>
                    <AICoachCalories />
                  </ProtectedRoute>
                }
              />
              
              {/* Protected Routes - Main Features */}
              <Route
                path="/community"
                element={
                  <ProtectedRoute>
                    <Community />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/experts"
                element={
                  <ProtectedRoute>
                    <FindExpert />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/expert/:id"
                element={
                  <ProtectedRoute>
                    <div className="p-8">Expert Detail Page - Coming Soon</div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/apply-as-expert"
                element={
                  <ProtectedRoute>
                    <ApplyExpert />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/schedule"
                element={
                  <ProtectedRoute>
                    <Schedule />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              
              {/* Dashboard Routes */}
              <Route
                path="/user-dashboard"
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/expert-dashboard"
                element={
                  <ProtectedRoute>
                    <div className="p-8">Expert Dashboard - Coming Soon</div>
                  </ProtectedRoute>
                }
              />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<div className="p-8">Admin Login - Coming Soon</div>} />
              <Route path="/admin/panel" element={<div className="p-8">Admin Panel - Coming Soon</div>} />
              
              {/* Additional Pages */}
              <Route path="/privacy-policy" element={<div className="p-8">Privacy Policy - Coming Soon</div>} />
              <Route path="/thank-you" element={<div className="p-8">Thank You Page - Coming Soon</div>} />
              <Route path="/details" element={<div className="p-8">Details Page - Coming Soon</div>} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
