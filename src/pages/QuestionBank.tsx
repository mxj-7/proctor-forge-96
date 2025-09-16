import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Search, 
  Plus, 
  Filter, 
  Edit, 
  Trash2, 
  Download, 
  Upload,
  FileText,
  Brain,
  Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  title: string;
  type: 'single' | 'multiple' | 'judge' | 'essay';
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  knowledge: string;
  content: string;
  options?: string[];
  answer: string;
  explanation: string;
  tags: string[];
  createdAt: string;
  usageCount: number;
}

const mockQuestions: Question[] = [
  {
    id: '1',
    title: '什么是机器学习？',
    type: 'single',
    difficulty: 'easy',
    category: '基础理论',
    knowledge: '机器学习概述',
    content: '机器学习是人工智能的一个分支，它的目标是让计算机能够通过数据学习，而不需要明确的编程。以下哪个选项最准确地描述了机器学习？',
    options: [
      '一种让计算机自动编程的技术',
      '通过算法让计算机从数据中学习模式和规律的方法',
      '用于创建智能机器人的技术',
      '一种数据存储和检索的方法'
    ],
    answer: 'B',
    explanation: '机器学习是通过算法让计算机从数据中学习模式和规律，从而能够对新数据进行预测或决策的方法。',
    tags: ['基础概念', '理论'],
    createdAt: '2024-01-15',
    usageCount: 15
  },
  {
    id: '2',
    title: '深度学习网络层数的影响',
    type: 'essay',
    difficulty: 'hard',
    category: '深度学习',
    knowledge: '神经网络架构',
    content: '请详细阐述深度神经网络中层数增加对模型性能的影响，包括优势和可能遇到的问题，并提出相应的解决方案。',
    answer: '深度增加的优势：1）更强的表征能力；2）能学习更复杂的特征；3）更好的抽象能力。问题：1）梯度消失/爆炸；2）过拟合；3）计算复杂度高。解决方案：1）残差连接；2）批归一化；3）Dropout；4）预训练等。',
    explanation: '这是一个开放性问题，需要从理论和实践两个角度来分析深度网络的特点。',
    tags: ['深度学习', '网络架构', '优化'],
    createdAt: '2024-01-14',
    usageCount: 8
  },
  {
    id: '3',
    title: '监督学习需要标注数据',
    type: 'judge',
    difficulty: 'easy',
    category: '基础理论',
    knowledge: '学习类型',
    content: '监督学习算法在训练过程中需要使用已标注的数据。',
    answer: '正确',
    explanation: '监督学习的特点就是使用已标注的训练数据来学习输入和输出之间的映射关系。',
    tags: ['监督学习', '基础概念'],
    createdAt: '2024-01-13',
    usageCount: 22
  }
];

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'single': return '单选题';
    case 'multiple': return '多选题';
    case 'judge': return '判断题';
    case 'essay': return '问答题';
    default: return type;
  }
};

const getDifficultyLabel = (difficulty: string) => {
  switch (difficulty) {
    case 'easy': return '简单';
    case 'medium': return '中等';
    case 'hard': return '困难';
    default: return difficulty;
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy': return 'default';
    case 'medium': return 'secondary';
    case 'hard': return 'destructive';
    default: return 'outline';
  }
};

const QuestionCard = ({ question, onEdit, onDelete }: { 
  question: Question; 
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) => (
  <Card className="hover:shadow-soft transition-all duration-200">
    <CardHeader>
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <div className="flex items-center space-x-2">
            <CardTitle className="text-lg">{question.title}</CardTitle>
            <Badge variant="outline">{getTypeLabel(question.type)}</Badge>
            <Badge variant={getDifficultyColor(question.difficulty)}>
              {getDifficultyLabel(question.difficulty)}
            </Badge>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>{question.category}</span>
            <span>•</span>
            <span>{question.knowledge}</span>
            <span>•</span>
            <span>使用 {question.usageCount} 次</span>
          </div>
        </div>
        <div className="flex space-x-1">
          <Button variant="ghost" size="sm" onClick={() => onEdit(question.id)}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(question.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <p className="text-sm line-clamp-2">{question.content}</p>
        
        {question.options && (
          <div className="space-y-1">
            {question.options.map((option, index) => (
              <div key={index} className="text-sm text-muted-foreground">
                {String.fromCharCode(65 + index)}. {option}
              </div>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex flex-wrap gap-1">
            {question.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">{question.createdAt}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function QuestionBank() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['基础理论', '深度学习', '机器学习算法', '数据预处理', '模型评估'];
  const knowledgePoints = ['机器学习概述', '神经网络架构', '学习类型', '特征工程', '性能指标'];

  const filteredQuestions = mockQuestions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         question.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || question.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || question.difficulty === selectedDifficulty;
    const matchesType = selectedType === 'all' || question.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesType;
  });

  const handleSelectQuestion = (questionId: string) => {
    setSelectedQuestions(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleSelectAll = () => {
    setSelectedQuestions(
      selectedQuestions.length === filteredQuestions.length 
        ? [] 
        : filteredQuestions.map(q => q.id)
    );
  };

  const handleEdit = (id: string) => {
    toast({
      title: "编辑试题",
      description: `编辑试题 ${id}`,
    });
  };

  const handleDelete = (id: string) => {
    toast({
      title: "删除试题",
      description: "试题已删除",
      variant: "destructive"
    });
  };

  const handleBatchDelete = () => {
    toast({
      title: "批量删除",
      description: `已删除 ${selectedQuestions.length} 道试题`,
      variant: "destructive"
    });
    setSelectedQuestions([]);
  };

  const handleImport = () => {
    toast({
      title: "导入试题",
      description: "试题导入功能开发中...",
    });
  };

  const handleExport = () => {
    toast({
      title: "导出试题",
      description: "试题导出功能开发中...",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">题库管理</h1>
          <p className="text-muted-foreground">管理和组织您的试题资源</p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleImport}>
            <Upload className="w-4 h-4 mr-2" />
            导入试题
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            导出试题
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                新增试题
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>新增试题</DialogTitle>
              </DialogHeader>
              <div className="text-center py-8">
                <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">试题编辑器开发中...</p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <div className="text-2xl font-bold">{mockQuestions.length}</div>
            </div>
            <p className="text-xs text-muted-foreground">总题目数</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Brain className="w-4 h-4 text-primary" />
              <div className="text-2xl font-bold">{categories.length}</div>
            </div>
            <p className="text-xs text-muted-foreground">知识领域</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-success" />
              <div className="text-2xl font-bold">
                {mockQuestions.reduce((acc, q) => acc + q.usageCount, 0)}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">总使用次数</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Edit className="w-4 h-4 text-warning" />
              <div className="text-2xl font-bold">{selectedQuestions.length}</div>
            </div>
            <p className="text-xs text-muted-foreground">已选择</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索试题内容..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                筛选
              </Button>
            </div>
            
            {showFilters && (
              <div className="grid gap-4 md:grid-cols-4 pt-4 border-t">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择分类" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部分类</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择难度" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部难度</SelectItem>
                    <SelectItem value="easy">简单</SelectItem>
                    <SelectItem value="medium">中等</SelectItem>
                    <SelectItem value="hard">困难</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择题型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部题型</SelectItem>
                    <SelectItem value="single">单选题</SelectItem>
                    <SelectItem value="multiple">多选题</SelectItem>
                    <SelectItem value="judge">判断题</SelectItem>
                    <SelectItem value="essay">问答题</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedDifficulty('all');
                    setSelectedType('all');
                    setSearchQuery('');
                  }}
                >
                  重置筛选
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedQuestions.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Checkbox 
                  checked={selectedQuestions.length === filteredQuestions.length}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm">
                  已选择 {selectedQuestions.length} 道试题
                </span>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  批量编辑
                </Button>
                <Button variant="destructive" size="sm" onClick={handleBatchDelete}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  批量删除
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            试题列表 ({filteredQuestions.length})
          </h2>
        </div>
        
        <div className="space-y-4">
          {filteredQuestions.map(question => (
            <div key={question.id} className="flex items-start space-x-4">
              <Checkbox 
                checked={selectedQuestions.includes(question.id)}
                onCheckedChange={() => handleSelectQuestion(question.id)}
                className="mt-6"
              />
              <div className="flex-1">
                <QuestionCard 
                  question={question} 
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            </div>
          ))}
        </div>
        
        {filteredQuestions.length === 0 && (
          <Card className="p-8 text-center">
            <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">未找到试题</h3>
            <p className="text-muted-foreground">请尝试调整搜索条件或筛选器</p>
          </Card>
        )}
      </div>
    </div>
  );
}