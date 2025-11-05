import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import DepartmentsPage from "./pages/Departments";
import CoursesPage from "./pages/Courses";
import CourseDetailsPage from "./pages/CourseDetails";
import CourseDetailPage from "./pages/CourseDetail";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import ConsultationPrompt from "@/components/ConsultationPrompt";
import ScrollArrows from "@/components/ScrollArrows";
import RequireAuth from "@/components/RequireAuth";

const queryClient = new QueryClient();

const App = () => {
  console.log('App rendering...');
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <ConsultationPrompt />
            <ScrollArrows />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/departments" element={<DepartmentsPage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/course/:courseId" element={<CourseDetailsPage />} />
              <Route path="/course-detail/:courseId" element={<CourseDetailPage />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
              <Route path="/admin" element={<RequireAuth><Admin /></RequireAuth>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
