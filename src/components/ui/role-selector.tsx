import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Users } from "lucide-react";

interface RoleSelectorProps {
  onRoleSelect: (role: 'student' | 'teacher') => void;
}

export function RoleSelector({ onRoleSelect }: RoleSelectorProps) {
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | null>(null);

  const handleRoleSelect = (role: 'student' | 'teacher') => {
    setSelectedRole(role);
    onRoleSelect(role);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
      <Card 
        className={`cursor-pointer transition-all duration-200 hover:shadow-medium ${
          selectedRole === 'student' 
            ? 'ring-2 ring-primary bg-gradient-card' 
            : 'hover:shadow-soft'
        }`}
        onClick={() => handleRoleSelect('student')}
      >
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
            <GraduationCap className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-xl">学生登录</CardTitle>
          <CardDescription>
            参加考试、查看成绩、完成实验任务
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            className="w-full" 
            variant={selectedRole === 'student' ? 'default' : 'outline'}
          >
            选择学生角色
          </Button>
        </CardContent>
      </Card>

      <Card 
        className={`cursor-pointer transition-all duration-200 hover:shadow-medium ${
          selectedRole === 'teacher' 
            ? 'ring-2 ring-primary bg-gradient-card' 
            : 'hover:shadow-soft'
        }`}
        onClick={() => handleRoleSelect('teacher')}
      >
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-xl">教师登录</CardTitle>
          <CardDescription>
            管理学生、创建考试、批改作业
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            className="w-full" 
            variant={selectedRole === 'teacher' ? 'default' : 'outline'}
          >
            选择教师角色
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}