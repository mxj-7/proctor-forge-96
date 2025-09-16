import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Calendar, 
  BookOpen, 
  Trophy, 
  Settings,
  Lock,
  Bell,
  Shield,
  Edit,
  Camera
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "张小明",
    email: "zhangxiaoming@example.com",
    studentId: "2023001001",
    phone: "138****5678",
    major: "计算机科学与技术",
    grade: "2023级",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    toast({
      title: "保存成功",
      description: "个人信息已更新",
    });
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "密码确认失败",
        description: "新密码与确认密码不一致",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "密码修改成功",
      description: "请使用新密码登录",
    });
    
    setFormData(prev => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }));
  };

  const stats = [
    { label: "完成考试", value: "12", icon: BookOpen },
    { label: "通过率", value: "85%", icon: Trophy },
    { label: "实验完成", value: "8", icon: Settings },
    { label: "平均分", value: "88", icon: Trophy }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">个人中心</h1>
        <p className="text-muted-foreground">管理您的个人信息和账户设置</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="relative mx-auto">
              <Avatar className="w-24 h-24 mx-auto">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="text-2xl">张</AvatarFallback>
              </Avatar>
              <Button 
                size="sm" 
                variant="outline" 
                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{formData.name}</h3>
              <p className="text-muted-foreground">{formData.studentId}</p>
              <Badge variant="secondary">{formData.major}</Badge>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{formData.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>{formData.grade}</span>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center space-y-1">
                  <stat.icon className="w-5 h-5 mx-auto text-muted-foreground" />
                  <div className="font-semibold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="md:col-span-2">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">基本信息</TabsTrigger>
              <TabsTrigger value="security">安全设置</TabsTrigger>
              <TabsTrigger value="preferences">偏好设置</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info" className="space-y-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>基本信息</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? '取消编辑' : '编辑信息'}
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">姓名</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentId">学号</Label>
                    <Input
                      id="studentId"
                      value={formData.studentId}
                      disabled
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">邮箱</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">手机号</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="major">专业</Label>
                    <Input
                      id="major"
                      value={formData.major}
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grade">年级</Label>
                    <Input
                      id="grade"
                      value={formData.grade}
                      disabled
                    />
                  </div>
                </div>
                
                {isEditing && (
                  <div className="flex space-x-2 pt-4">
                    <Button onClick={handleSave}>保存更改</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      取消
                    </Button>
                  </div>
                )}
              </CardContent>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-4">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>安全设置</span>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium flex items-center space-x-2">
                    <Lock className="w-4 h-4" />
                    <span>修改密码</span>
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">当前密码</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                        placeholder="请输入当前密码"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">新密码</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={(e) => handleInputChange('newPassword', e.target.value)}
                        placeholder="请输入新密码"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">确认密码</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        placeholder="请再次输入新密码"
                      />
                    </div>
                    
                    <Button onClick={handlePasswordChange}>
                      修改密码
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">登录活动</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>最近登录</span>
                      <span className="text-muted-foreground">今天 14:30</span>
                    </div>
                    <div className="flex justify-between">
                      <span>登录设备</span>
                      <span className="text-muted-foreground">Chrome浏览器</span>
                    </div>
                    <div className="flex justify-between">
                      <span>登录IP</span>
                      <span className="text-muted-foreground">192.168.1.100</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="preferences" className="space-y-4">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>偏好设置</span>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">通知设置</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">考试提醒</div>
                        <div className="text-sm text-muted-foreground">考试开始前30分钟提醒</div>
                      </div>
                      <Button variant="outline" size="sm">开启</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">成绩通知</div>
                        <div className="text-sm text-muted-foreground">成绩发布时立即通知</div>
                      </div>
                      <Button variant="outline" size="sm">开启</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">作业提醒</div>
                        <div className="text-sm text-muted-foreground">作业截止前1天提醒</div>
                      </div>
                      <Button variant="outline" size="sm">开启</Button>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">界面设置</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>主题模式</span>
                      <Button variant="outline" size="sm">跟随系统</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span>语言</span>
                      <Button variant="outline" size="sm">简体中文</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Profile;