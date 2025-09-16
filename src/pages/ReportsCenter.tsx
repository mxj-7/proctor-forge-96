import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Clock, 
  Target, 
  TrendingUp, 
  FileText, 
  ChevronRight,
  Award,
  Calendar,
  BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Report {
  id: string;
  examTitle: string;
  examDate: string;
  score: number;
  totalScore: number;
  percentage: number;
  status: 'passed' | 'failed';
  rank?: number;
  totalParticipants?: number;
  duration: string;
  type: 'formal' | 'mock';
}

const mockReports: Report[] = [
  {
    id: '1',
    examTitle: '机器学习基础测试',
    examDate: '2024-01-15',
    score: 88,
    totalScore: 100,
    percentage: 88,
    status: 'passed',
    rank: 5,
    totalParticipants: 45,
    duration: '1小时45分钟',
    type: 'formal'
  },
  {
    id: '2',
    examTitle: 'Python编程实战',
    examDate: '2024-01-10',
    score: 92,
    totalScore: 100,
    percentage: 92,
    status: 'passed',
    rank: 2,
    totalParticipants: 38,
    duration: '1小时20分钟',
    type: 'formal'
  },
  {
    id: '3',
    examTitle: '深度学习模拟练习',
    examDate: '2024-01-08',
    score: 76,
    totalScore: 100,
    percentage: 76,
    status: 'passed',
    duration: '55分钟',
    type: 'mock'
  },
  {
    id: '4',
    examTitle: '数据分析综合测试',
    examDate: '2024-01-05',
    score: 65,
    totalScore: 100,
    percentage: 65,
    status: 'failed',
    duration: '1小时10分钟',
    type: 'mock'
  }
];

const getScoreColor = (percentage: number) => {
  if (percentage >= 90) return 'text-success';
  if (percentage >= 80) return 'text-primary';
  if (percentage >= 70) return 'text-warning';
  return 'text-destructive';
};

const getScoreBadgeVariant = (status: string) => {
  return status === 'passed' ? 'default' : 'destructive';
};

const ReportCard = ({ report }: { report: Report }) => {
  const navigate = useNavigate();
  
  return (
    <Card className="hover:shadow-soft transition-all duration-200 cursor-pointer" 
          onClick={() => navigate(`/reports/detail/${report.id}`)}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-lg">{report.examTitle}</CardTitle>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{report.examDate}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{report.duration}</span>
              </div>
            </div>
          </div>
          <Badge variant={getScoreBadgeVariant(report.status)}>
            {report.status === 'passed' ? '通过' : '未通过'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Score Display */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-primary" />
              <span className="font-medium">得分</span>
            </div>
            <div className={`text-2xl font-bold ${getScoreColor(report.percentage)}`}>
              {report.score}/{report.totalScore}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>完成度</span>
              <span className={getScoreColor(report.percentage)}>{report.percentage}%</span>
            </div>
            <Progress value={report.percentage} className="h-2" />
          </div>
          
          {/* Rank for formal exams */}
          {report.rank && report.totalParticipants && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">排名</span>
              </div>
              <span className="text-sm font-medium">
                {report.rank}/{report.totalParticipants}
              </span>
            </div>
          )}
          
          {/* View Details Button */}
          <div className="flex items-center justify-between pt-2 border-t">
            <Badge variant="outline" className="text-xs">
              {report.type === 'formal' ? '正式考试' : '模拟考试'}
            </Badge>
            <Button variant="ghost" size="sm" className="text-primary">
              查看详情
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const StatsSummary = ({ reports }: { reports: Report[] }) => {
  const totalReports = reports.length;
  const passedReports = reports.filter(r => r.status === 'passed').length;
  const averageScore = reports.reduce((acc, r) => acc + r.percentage, 0) / totalReports || 0;
  const highestScore = Math.max(...reports.map(r => r.percentage));
  
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <div className="text-2xl font-bold">{totalReports}</div>
          </div>
          <p className="text-xs text-muted-foreground">总考试次数</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-success" />
            <div className="text-2xl font-bold text-success">{passedReports}</div>
          </div>
          <p className="text-xs text-muted-foreground">通过次数</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-primary" />
            <div className="text-2xl font-bold">{Math.round(averageScore)}%</div>
          </div>
          <p className="text-xs text-muted-foreground">平均得分</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-warning" />
            <div className="text-2xl font-bold">{highestScore}%</div>
          </div>
          <p className="text-xs text-muted-foreground">最高得分</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default function ReportsCenter() {
  const [activeTab, setActiveTab] = useState('all');
  
  const allReports = mockReports;
  const formalReports = mockReports.filter(r => r.type === 'formal');
  const mockExamReports = mockReports.filter(r => r.type === 'mock');
  
  const getCurrentReports = () => {
    switch (activeTab) {
      case 'formal': return formalReports;
      case 'mock': return mockExamReports;
      default: return allReports;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">成绩报告中心</h1>
        <p className="text-muted-foreground">查看您的考试成绩和学习分析</p>
      </div>

      <StatsSummary reports={allReports} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">全部报告</TabsTrigger>
          <TabsTrigger value="formal">正式考试</TabsTrigger>
          <TabsTrigger value="mock">模拟考试</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">全部考试报告</h2>
            <Badge variant="outline">{allReports.length} 份报告</Badge>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            {allReports.map(report => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="formal" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">正式考试报告</h2>
            <Badge variant="outline">{formalReports.length} 份报告</Badge>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            {formalReports.map(report => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mock" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">模拟考试报告</h2>
            <Badge variant="outline">{mockExamReports.length} 份报告</Badge>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            {mockExamReports.map(report => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {allReports.length === 0 && (
        <Card className="p-8 text-center">
          <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">暂无成绩报告</h3>
          <p className="text-muted-foreground">完成考试后，您的成绩报告将在这里显示</p>
        </Card>
      )}
    </div>
  );
}