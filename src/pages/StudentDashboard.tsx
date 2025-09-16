import { useEffect, useState } from "react";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  BookOpen, 
  Trophy, 
  Clock,
  Play,
  FileText,
  Beaker,
  ArrowRight
} from "lucide-react";

export default function StudentDashboard() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Mock data
  const upcomingExams = [
    {
      id: 1,
      name: "人工智能基础测试",
      type: "正式考试",
      date: "2024-01-20",
      time: "14:00-16:00",
      status: "未开始"
    },
    {
      id: 2,
      name: "机器学习模拟考试",
      type: "模拟考试",
      date: "2024-01-18",
      time: "随时可考",
      status: "进行中"
    },
    {
      id: 3,
      name: "深度学习期末考试",
      type: "正式考试",
      date: "2024-01-25",
      time: "09:00-11:00",
      status: "未开始"
    }
  ];

  const recentResults = [
    {
      id: 1,
      name: "Python编程基础",
      score: 92,
      date: "2024-01-15",
      status: "优秀"
    },
    {
      id: 2,
      name: "数据结构与算法",
      score: 88,
      date: "2024-01-12",
      status: "良好"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-card p-6 rounded-lg border">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          欢迎回来，{username || '同学'}！
        </h1>
        <p className="text-muted-foreground">
          今天是学习的好日子，继续保持学习的热情吧！
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="待考试数量"
          value={3}
          description="本周内需要完成"
          icon={Calendar}
          variant="warning"
        />
        <StatCard
          title="已公布成绩"
          value={2}
          description="最新成绩已发布"
          icon={Trophy}
          variant="success"
        />
        <StatCard
          title="实验任务"
          value={5}
          description="进行中的实验"
          icon={Beaker}
        />
        <StatCard
          title="平均分数"
          value="90.2"
          description="较上次提高 +5.2%"
          icon={BookOpen}
          trend={{ value: 5.2, label: "较上次" }}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-primary text-primary-foreground hover:shadow-medium transition-all duration-200">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Play className="w-6 h-6" />
              <CardTitle>参加正式考试</CardTitle>
            </div>
            <CardDescription className="text-primary-foreground/80">
              进入正式考试环境，开始你的知识测验
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" className="w-full">
              进入考试中心
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card hover:shadow-medium transition-all duration-200">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <FileText className="w-6 h-6 text-primary" />
              <CardTitle>参加模拟考试</CardTitle>
            </div>
            <CardDescription>
              无限次练习机会，巩固知识要点
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              开始模拟考试
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Exams */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>即将开始的考试</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingExams.map((exam) => (
              <div key={exam.id} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{exam.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {exam.date} | {exam.time}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={exam.status === '进行中' ? 'default' : 'outline'}>
                    {exam.status}
                  </Badge>
                  <Badge variant="secondary">
                    {exam.type}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-5 h-5" />
              <span>最近成绩</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentResults.map((result) => (
              <div key={result.id} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{result.name}</h4>
                  <p className="text-sm text-muted-foreground">{result.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-primary">{result.score}分</span>
                  <Badge variant={result.score >= 90 ? 'default' : 'secondary'}>
                    {result.status}
                  </Badge>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              查看所有成绩
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}