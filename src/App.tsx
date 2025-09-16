import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import ExamCenter from "./pages/ExamCenter";
import LabCenter from "./pages/LabCenter";
import ReportsCenter from "./pages/ReportsCenter";
import Profile from "./pages/Profile";
import QuestionBank from "./pages/QuestionBank";
import { Layout } from "./components/layout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/teacher" element={<TeacherDashboard />} />
            <Route path="/exams" element={<ExamCenter />} />
            <Route path="/lab" element={<LabCenter />} />
            <Route path="/reports" element={<ReportsCenter />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/question-bank" element={<QuestionBank />} />
            <Route path="/exam-manage" element={<div className="p-8 text-center">考试管理功能开发中...</div>} />
            <Route path="/marking" element={<div className="p-8 text-center">批改中心功能开发中...</div>} />
            <Route path="/lab-manage" element={<div className="p-8 text-center">实验管理功能开发中...</div>} />
            <Route path="/review-lab" element={<div className="p-8 text-center">实验复核功能开发中...</div>} />
            <Route path="/student-manage" element={<div className="p-8 text-center">学生管理功能开发中...</div>} />
            <Route path="/score-manage" element={<div className="p-8 text-center">成绩管理功能开发中...</div>} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
