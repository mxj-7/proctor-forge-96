import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { LogOut, Bell } from "lucide-react";

export function Layout() {
  const [userRole, setUserRole] = useState<'student' | 'teacher' | null>(null);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('userRole') as 'student' | 'teacher' | null;
    const user = localStorage.getItem('username') || "";
    
    if (!role) {
      navigate('/');
      return;
    }
    
    setUserRole(role);
    setUsername(user);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    navigate('/');
  };

  if (!userRole) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar userRole={userRole} />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b bg-card flex items-center justify-between px-4">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <div>
                <h2 className="font-semibold text-foreground">
                  {userRole === 'student' ? '学生端' : '教师端'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  欢迎，{username}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                退出登录
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}