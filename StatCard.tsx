import React from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  unit?: string;
  change?: number;
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit = '',
  change,
  icon = <Activity className="h-6 w-6 text-blue-500" />
}) => {
  const formatValue = (val: number): string => {
    if (val >= 1000) {
      return (val / 1000).toFixed(1) + 'k';
    }
    return val.toString();
  };

  const getChangeColor = () => {
    if (!change) return 'text-gray-500';
    return change > 0 ? 'text-green-500' : 'text-red-500';
  };

  const getChangeIcon = () => {
    if (!change) return null;
    return change > 0 ? (
      <TrendingUp className="h-4 w-4" />
    ) : (
      <TrendingDown className="h-4 w-4" />
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="flex items-baseline mt-1">
            <p className="text-2xl font-semibold text-gray-900">
              {formatValue(value)}{unit}
            </p>
            {change !== undefined && (
              <p className={`ml-2 text-sm flex items-center ${getChangeColor()}`}>
                {getChangeIcon()}
                <span className="ml-0.5">{Math.abs(change)}%</span>
              </p>
            )}
          </div>
        </div>
        <div className="rounded-full p-3 bg-blue-50">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;