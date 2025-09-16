import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Database, 
  Brain, 
  BarChart3, 
  Bot, 
  Image, 
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  Upload,
  Play
} from "lucide-react";

interface LabTask {
  id: string;
  title: string;
  description: string;
  type: 'data-annotation' | 'model-training' | 'data-analysis' | 'ai-agent' | 'ai-image';
  status: 'not-started' | 'in-progress' | 'submitted' | 'graded';
  dueDate: string;
  progress: number;
  score?: number;
  maxScore: number;
  resources: string[];
  submissionCount: number;
  maxSubmissions?: number;
}

const mockTasks: LabTask[] = [
  {
    id: '1',
    title: '图像分类数据集标注',
    description: '为猫狗图像数据集进行准确标注，要求标注1000张图像',
    type: 'data-annotation',
    status: 'in-progress',
    dueDate: '2024-01-25',
    progress: 65,
    maxScore: 100,
    resources: ['dataset.zip', '标注规范.pdf', '标注工具使用指南.md'],
    submissionCount: 2,
    maxSubmissions: 3
  },
  {
    id: '2',
    title: 'CNN模型训练实验',
    description: '使用PyTorch训练卷积神经网络，完成CIFAR-10分类任务',
    type: 'model-training',
    status: 'submitted',
    dueDate: '2024-01-20',
    progress: 100,
    score: 88,
    maxScore: 100,
    resources: ['starter_code.py', 'CIFAR-10数据集.zip', '实验要求.pdf'],
    submissionCount: 1,
    maxSubmissions: 2
  },
  {
    id: '3',
    title: '销售数据分析报告',
    description: '分析电商平台销售数据，生成可视化报告和业务洞察',
    type: 'data-analysis',
    status: 'graded',
    dueDate: '2024-01-15',
    progress: 100,
    score: 92,
    maxScore: 100,
    resources: ['sales_data.csv', '分析模板.xlsx', '参考文献.pdf'],
    submissionCount: 1
  },
  {
    id: '4',
    title: '智能客服机器人开发',
    description: '基于大语言模型开发智能客服系统，处理常见问题',
    type: 'ai-agent',
    status: 'not-started',
    dueDate: '2024-02-01',
    progress: 0,
    maxScore: 100,
    resources: ['API文档.pdf', '示例对话.json', '评测标准.md'],
    submissionCount: 0,
    maxSubmissions: 3
  },
  {
    id: '5',
    title: 'AI艺术创作挑战',
    description: '使用Stable Diffusion创作主题海报，要求原创性和美观性',
    type: 'ai-image',
    status: 'in-progress',
    dueDate: '2024-01-30',
    progress: 30,
    maxScore: 100,
    resources: ['创作主题.pdf', 'Prompt工程指南.md', '评分标准.pdf'],
    submissionCount: 1,
    maxSubmissions: 5
  }
];

const getTaskIcon = (type: string) => {
  switch (type) {
    case 'data-annotation': return Database;
    case 'model-training': return Brain;
    case 'data-analysis': return BarChart3;
    case 'ai-agent': return Bot;
    case 'ai-image': return Image;
    default: return FileText;
  }
};

const getTaskTypeLabel = (type: string) => {
  switch (type) {
    case 'data-annotation': return '数据标注';
    case 'model-training': return '模型训练';
    case 'data-analysis': return '数据分析';
    case 'ai-agent': return 'AI智能体';
    case 'ai-image': return 'AI图像生成';
    default: return type;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'graded': return CheckCircle;
    case 'submitted': return CheckCircle;
    case 'in-progress': return Play;
    case 'not-started': return AlertTriangle;
    default: return FileText;
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'not-started': return '未开始';
    case 'in-progress': return '进行中';
    case 'submitted': return '已提交';
    case 'graded': return '已评阅';
    default: return status;
  }
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'graded': return 'default';
    case 'submitted': return 'secondary';
    case 'in-progress': return 'outline';
    case 'not-started': return 'destructive';
    default: return 'outline';
  }
};

const TaskCard = ({ task }: { task: LabTask }) => {
  const TaskIcon = getTaskIcon(task.type);
  const StatusIcon = getStatusIcon(task.status);
  
  return (
    <Card className="hover:shadow-soft transition-all duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <TaskIcon className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-lg">{task.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{task.description}</p>
              <Badge variant="outline" className="text-xs">
                {getTaskTypeLabel(task.type)}
              </Badge>
            </div>
          </div>
          <Badge variant={getStatusVariant(task.status)}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {getStatusLabel(task.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>完成进度</span>
            <span>{task.progress}%</span>
          </div>
          <Progress value={task.progress} className="h-2" />
        </div>
        
        {/* Due Date */}
        <div className="flex items-center space-x-2 text-sm">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">截止日期:</span>
          <span>{task.dueDate}</span>
        </div>
        
        {/* Submission Info */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Upload className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">提交次数:</span>
            <span>{task.submissionCount}{task.maxSubmissions ? `/${task.maxSubmissions}` : ''}</span>
          </div>
          {task.score !== undefined && (
            <div className="flex items-center space-x-1">
              <span className="text-muted-foreground">得分:</span>
              <span className="font-medium text-primary">{task.score}/{task.maxScore}</span>
            </div>
          )}
        </div>
        
        {/* Resources */}
        <div className="space-y-2">
          <span className="text-sm font-medium">实验资源:</span>
          <div className="flex flex-wrap gap-2">
            {task.resources.map((resource, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {resource}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex space-x-2 pt-2 border-t">
          {task.status === 'not-started' && (
            <Button className="flex-1">
              <Play className="w-4 h-4 mr-2" />
              开始实验
            </Button>
          )}
          {task.status === 'in-progress' && (
            <>
              <Button className="flex-1">
                继续实验
              </Button>
              <Button variant="outline" className="flex-1">
                <Upload className="w-4 h-4 mr-2" />
                提交作业
              </Button>
            </>
          )}
          {(task.status === 'submitted' || task.status === 'graded') && (
            <Button variant="outline" className="flex-1">
              查看详情
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function LabCenter() {
  const [activeTab, setActiveTab] = useState('all');
  
  const getFilteredTasks = () => {
    switch (activeTab) {
      case 'in-progress': return mockTasks.filter(t => t.status === 'in-progress');
      case 'completed': return mockTasks.filter(t => t.status === 'submitted' || t.status === 'graded');
      case 'not-started': return mockTasks.filter(t => t.status === 'not-started');
      default: return mockTasks;
    }
  };
  
  const tasks = getFilteredTasks();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">实验中心</h1>
        <p className="text-muted-foreground">参与各类AI实践项目，提升动手能力</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <div className="text-2xl font-bold">{mockTasks.length}</div>
            </div>
            <p className="text-xs text-muted-foreground">总实验数</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Play className="w-4 h-4 text-warning" />
              <div className="text-2xl font-bold text-warning">
                {mockTasks.filter(t => t.status === 'in-progress').length}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">进行中</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-success" />
              <div className="text-2xl font-bold text-success">
                {mockTasks.filter(t => t.status === 'submitted' || t.status === 'graded').length}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">已完成</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              <div className="text-2xl font-bold">
                {Math.round(mockTasks.reduce((acc, t) => acc + (t.score || 0), 0) / mockTasks.filter(t => t.score).length || 0)}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">平均得分</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">全部实验</TabsTrigger>
          <TabsTrigger value="not-started">未开始</TabsTrigger>
          <TabsTrigger value="in-progress">进行中</TabsTrigger>
          <TabsTrigger value="completed">已完成</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">全部实验任务</h2>
            <Badge variant="outline">{tasks.length} 个任务</Badge>
          </div>
          
          <div className="grid gap-6">
            {tasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="not-started" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">未开始的实验</h2>
            <Badge variant="outline">{tasks.length} 个任务</Badge>
          </div>
          
          <div className="grid gap-6">
            {tasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">进行中的实验</h2>
            <Badge variant="outline">{tasks.length} 个任务</Badge>
          </div>
          
          <div className="grid gap-6">
            {tasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">已完成的实验</h2>
            <Badge variant="outline">{tasks.length} 个任务</Badge>
          </div>
          
          <div className="grid gap-6">
            {tasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {tasks.length === 0 && (
        <Card className="p-8 text-center">
          <Brain className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">暂无实验任务</h3>
          <p className="text-muted-foreground">当前没有符合条件的实验任务</p>
        </Card>
      )}
    </div>
  );
}