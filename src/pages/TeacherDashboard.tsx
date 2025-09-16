import { useEffect, useState } from "react";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  BookOpen, 
  Calendar, 
  ClipboardCheck,
  AlertCircle,
  Plus,
  Database,
  FileText,
  Beaker,
  UserCheck
} from "lucide-react";

export default function TeacherDashboard() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Mock data
  const pendingTasks = [
    {
      id: 1,
      type: "简答题批改",
      exam: "人工智能基础测试",
      count: 12,
      urgent: true
    },
    {
      id: 2,
      type: "考试复核",
      exam: "机器学习期末考试",
      count: 3,
      urgent: false
    },
    {
      id: 3,
      type: "实验复核", 
      exam: "数据标注实验",
      count: 8,
      urgent: true
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: "创建考试",
      target: "深度学习期末考试",
      time: "2小时前"
    },
    {
      id: 2,
      action: "批改完成",
      target: "Python编程基础",
      time: "1天前"
    },
    {
      id: 3,
      action: "发布实验",
      target: "图像识别实验",
      time: "2天前"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-card p-6 rounded-lg border">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          欢迎回来，{username || '老师'}！
        </h1>
        <p className="text-muted-foreground">
          今天有一些待处理的任务需要您的关注
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="管理学生总数"
          value={156}
          description="活跃学生账户"
          icon={Users}
        />
        <StatCard
          title="题库试题总数"
          value={892}
          description="各类型题目"
          icon={Database}
        />
        <StatCard
          title="已创建考试"
          value={24}
          description="本学期已创建"
          icon={Calendar}
        />
        <StatCard
          title="待批改任务"
          value={23}
          description="需要处理的任务"
          icon={ClipboardCheck}
          variant="warning"
        />
      </div>

      {/* Pending Tasks Alert */}
      <Card className="border-warning/20 bg-warning-light/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-warning">
            <AlertCircle className="w-5 h-5" />
            <span>待办事项</span>
          </CardTitle>
          <CardDescription>
            您有 {pendingTasks.filter(task => task.urgent).length} 项紧急任务需要处理
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {pendingTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${task.urgent ? 'bg-destructive' : 'bg-muted-foreground'}`} />
                <div>
                  <h4 className="font-medium">{task.type}</h4>
                  <p className="text-sm text-muted-foreground">{task.exam}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">
                  {task.count} 项
                </Badge>
                <Button size="sm" variant="outline">
                  处理
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-medium transition-all duration-200 cursor-pointer">
          <CardHeader className="text-center">
            <Plus className="w-8 h-8 text-primary mx-auto mb-2" />
            <CardTitle>创建考试</CardTitle>
            <CardDescription>新建正式或模拟考试</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">立即创建</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-all duration-200 cursor-pointer">
          <CardHeader className="text-center">
            <Database className="w-8 h-8 text-primary mx-auto mb-2" />
            <CardTitle>管理题库</CardTitle>
            <CardDescription>添加和编辑试题</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">进入题库</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-all duration-200 cursor-pointer">
          <CardHeader className="text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <CardTitle>管理学生</CardTitle>
            <CardDescription>学生账户管理</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">学生管理</Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Lab Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>最近活动</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                <div>
                  <h4 className="font-medium">{activity.action}</h4>
                  <p className="text-sm text-muted-foreground">{activity.target}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Lab Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Beaker className="w-5 h-5" />
              <span>实验管理</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex-col">
                <Beaker className="w-6 h-6 mb-2" />
                实验管理
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <UserCheck className="w-6 h-6 mb-2" />
                实验复核
              </Button>
            </div>
            <div className="p-3 bg-accent/50 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">待复核实验</p>
                  <p className="text-sm text-muted-foreground">需要人工复核的实验结果</p>
                </div>
                <Badge variant="secondary">8 项</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}