import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  variant?: 'default' | 'success' | 'warning';
}

export function StatCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend,
  variant = 'default' 
}: StatCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'border-success/20 bg-success-light/50';
      case 'warning':
        return 'border-warning/20 bg-warning-light/50';
      default:
        return 'border-border bg-gradient-card';
    }
  };

  const getIconStyles = () => {
    switch (variant) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      default:
        return 'text-primary';
    }
  };

  return (
    <Card className={`${getVariantStyles()} hover:shadow-soft transition-all duration-200`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={`h-4 w-4 ${getIconStyles()}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
        {trend && (
          <div className="flex items-center mt-2">
            <span className={`text-xs ${
              trend.value > 0 ? 'text-success' : trend.value < 0 ? 'text-destructive' : 'text-muted-foreground'
            }`}>
              {trend.value > 0 ? '+' : ''}{trend.value}% {trend.label}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}