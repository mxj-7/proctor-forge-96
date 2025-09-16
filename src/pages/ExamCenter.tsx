import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, FileText, AlertCircle } from "lucide-react";

interface Exam {
  id: string;
  title: string;
  description: string;
  type: 'formal' | 'mock';
  status: 'upcoming' | 'ongoing' | 'ended';
  duration: number; // minutes
  participants: number;
  startTime: string;
  endTime: string;
  attempts?: number; // for mock exams
}

const mockExams: Exam[] = [
  {
    id: '1',
    title: '机器学习基础测试',
    description: '涵盖监督学习、无监督学习基本概念',
    type: 'formal',
    status: 'upcoming',
    duration: 120,
    participants: 45,
    startTime: '2024-01-20 14:00',
    endTime: '2024-01-20 16:00'
  },
  {
    id: '2',
    title: 'Python编程实战',
    description: '数据结构、算法、面向对象编程',
    type: 'formal',
    status: 'ongoing',
    duration: 90,
    participants: 38,
    startTime: '2024-01-18 10:00',
    endTime: '2024-01-18 11:30'
  },
  {
    id: '3',
    title: '深度学习模拟练习',
    description: '神经网络、CNN、RNN相关知识点',
    type: 'mock',
    status: 'ongoing',
    duration: 60,
    participants: 52,
    startTime: '随时可参加',
    endTime: '无限制',
    attempts: 3
  },
  {
    id: '4',
    title: '数据分析综合测试',
    description: '统计学基础、数据可视化、pandas使用',
    type: 'mock',
    status: 'ongoing',
    duration: 75,
    participants: 29,
    startTime: '随时可参加',
    endTime: '无限制',
    attempts: 5
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'upcoming': return 'secondary';
    case 'ongoing': return 'default';
    case 'ended': return 'outline';
    default: return 'secondary';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'upcoming': return '未开始';
    case 'ongoing': return '进行中';
    case 'ended': return '已结束';
    default: return status;
  }
};

const ExamCard = ({ exam }: { exam: Exam }) => (
  <Card className="hover:shadow-soft transition-all duration-200">
    <CardHeader>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <CardTitle className="text-lg">{exam.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{exam.description}</p>
        </div>
        <Badge variant={getStatusColor(exam.status)}>
          {getStatusText(exam.status)}
        </Badge>
      </div>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2 text-sm">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span>{exam.duration}分钟</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span>{exam.participants}人参加</span>
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-muted-foreground">开始时间:</span>
          <span>{exam.startTime}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-muted-foreground">结束时间:</span>
          <span>{exam.endTime}</span>
        </div>
        {exam.attempts && (
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-muted-foreground">已参加次数:</span>
            <span>{exam.attempts}次</span>
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        {exam.status === 'ongoing' && (
          <Button className="flex-1">
            <FileText className="w-4 h-4 mr-2" />
            {exam.type === 'formal' ? '参加考试' : '开始练习'}
          </Button>
        )}
        {exam.status === 'upcoming' && (
          <Button variant="outline" className="flex-1" disabled>
            <AlertCircle className="w-4 h-4 mr-2" />
            等待开始
          </Button>
        )}
        {exam.status === 'ended' && (
          <Button variant="outline" className="flex-1">
            查看结果
          </Button>
        )}
      </div>
    </CardContent>
  </Card>
);

export default function ExamCenter() {
  const [activeTab, setActiveTab] = useState('formal');

  const formalExams = mockExams.filter(exam => exam.type === 'formal');
  const mockExamsList = mockExams.filter(exam => exam.type === 'mock');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">考试中心</h1>
        <p className="text-muted-foreground">参加正式考试和模拟练习</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="formal">正式考试</TabsTrigger>
          <TabsTrigger value="mock">模拟考试</TabsTrigger>
        </TabsList>

        <TabsContent value="formal" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">正式考试</h2>
            <Badge variant="outline">{formalExams.length} 场考试</Badge>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            {formalExams.map(exam => (
              <ExamCard key={exam.id} exam={exam} />
            ))}
          </div>
          
          {formalExams.length === 0 && (
            <Card className="p-8 text-center">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">暂无正式考试</h3>
              <p className="text-muted-foreground">当前没有可参加的正式考试</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="mock" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">模拟考试</h2>
            <Badge variant="outline">{mockExamsList.length} 场练习</Badge>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            {mockExamsList.map(exam => (
              <ExamCard key={exam.id} exam={exam} />
            ))}
          </div>
          
          {mockExamsList.length === 0 && (
            <Card className="p-8 text-center">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">暂无模拟考试</h3>
              <p className="text-muted-foreground">当前没有可参加的模拟考试</p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}