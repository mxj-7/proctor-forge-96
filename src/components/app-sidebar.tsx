import { useState } from "react";
import { 
  BookOpen, 
  Calendar, 
  ClipboardCheck, 
  FileText, 
  GraduationCap, 
  Home, 
  Settings, 
  Users,
  Beaker,
  BarChart3,
  MessageSquare,
  Database,
  UserCheck
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  userRole: 'student' | 'teacher';
}

const studentItems = [
  { title: "学生仪表盘", url: "/dashboard", icon: Home },
  { title: "考试中心", url: "/exams", icon: Calendar },
  { title: "实验中心", url: "/lab", icon: Beaker },
  { title: "成绩报告", url: "/reports", icon: BarChart3 },
  { title: "个人中心", url: "/profile", icon: Settings },
];

const teacherItems = [
  { title: "教师工作台", url: "/teacher", icon: Home },
  { title: "题库管理", url: "/question-bank", icon: Database },
  { title: "考试管理", url: "/exam-manage", icon: Calendar },
  { title: "批改中心", url: "/marking", icon: ClipboardCheck },
  { title: "实验管理", url: "/lab-manage", icon: Beaker },
  { title: "实验复核", url: "/review-lab", icon: UserCheck },
  { title: "学生管理", url: "/student-manage", icon: Users },
  { title: "成绩管理", url: "/score-manage", icon: BarChart3 },
];

export function AppSidebar({ userRole }: AppSidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  const items = userRole === 'student' ? studentItems : teacherItems;
  const userTypeLabel = userRole === 'student' ? '学生功能' : '教师功能';

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground font-medium" : "hover:bg-accent hover:text-accent-foreground";

  return (
    <Sidebar
      className="w-64"
      collapsible="icon"
    >
      <SidebarContent className="bg-card">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">学习管理系统</h2>
              <p className="text-xs text-muted-foreground">
                {userRole === 'student' ? '学生端' : '教师端'}
              </p>
            </div>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>{userTypeLabel}</SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}