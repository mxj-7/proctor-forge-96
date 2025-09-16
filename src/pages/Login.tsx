import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoleSelector } from "@/components/ui/role-selector";
import { LoginForm } from "@/components/login-form";
import { GraduationCap } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";

export default function Login() {
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | null>(null);
  const navigate = useNavigate();

  const handleRoleSelect = (role: 'student' | 'teacher') => {
    setSelectedRole(role);
  };

  const handleLogin = (credentials: { username: string; password: string; role: 'student' | 'teacher' }) => {
    // Store user info in localStorage for demo purposes
    localStorage.setItem('userRole', credentials.role);
    localStorage.setItem('username', credentials.username);
    
    // Navigate based on role
    if (credentials.role === 'student') {
      navigate('/dashboard');
    } else {
      navigate('/teacher');
    }
  };

  const handleBack = () => {
    setSelectedRole(null);
  };

  return (
    <div className="min-h-screen relative">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-primary/50" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              智能学习管理系统
            </h1>
            <p className="text-white/90 text-lg">
              现代化的在线学习、考试与实验管理平台
            </p>
          </div>

          <div className="flex justify-center">
            {!selectedRole ? (
              <RoleSelector onRoleSelect={handleRoleSelect} />
            ) : (
              <LoginForm 
                role={selectedRole} 
                onBack={handleBack}
                onLogin={handleLogin}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}