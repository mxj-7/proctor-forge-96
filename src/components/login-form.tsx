import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

interface LoginFormProps {
  role: 'student' | 'teacher';
  onBack: () => void;
  onLogin: (credentials: { username: string; password: string; role: 'student' | 'teacher' }) => void;
}

export function LoginForm({ role, onBack, onLogin }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login delay
    setTimeout(() => {
      onLogin({ username, password, role });
      setIsLoading(false);
    }, 1000);
  };

  const roleTitle = role === 'student' ? '学生登录' : '教师登录';
  const roleDescription = role === 'student' 
    ? '使用学号和密码登录系统' 
    : '使用工号和密码登录管理系统';

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="self-start -ml-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回选择
        </Button>
        <div className="text-center">
          <CardTitle className="text-2xl">{roleTitle}</CardTitle>
          <CardDescription className="mt-2">
            {roleDescription}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">
              {role === 'student' ? '学号' : '工号'}
            </Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={role === 'student' ? '请输入学号' : '请输入工号'}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">密码</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? '登录中...' : '登录'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}