import React from 'react';
import { useContent } from '../contexts/ContentContext';
import { Clock, Award, BookOpen, Target } from 'lucide-react';
import { mockAnalyticsReport } from '../data/mockData';
import StatCard from '../components/analytics/StatCard';
import ProgressChart from '../components/analytics/ProgressChart';

const Analytics: React.FC = () => {
  const { userPerformance } = useContent();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Learning Analytics</h1>
        <p className="mt-1 text-gray-600">
          Track your progress and identify areas for improvement.
        </p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Average Score" 
          value={mockAnalyticsReport.scores.mean} 
          unit="%" 
          change={5}
          icon={<Award className="h-6 w-6 text-purple-500" />}
        />
        <StatCard 
          title="Time Spent" 
          value={Math.round(mockAnalyticsReport.timeSpent.mean / 60)} 
          unit=" min" 
          change={10}
          icon={<Clock className="h-6 w-6 text-blue-500" />}
        />
        <StatCard 
          title="Completion Rate" 
          value={mockAnalyticsReport.completionRate.mean} 
          unit="%" 
          change={3}
          icon={<Target className="h-6 w-6 text-green-500" />}
        />
        <StatCard 
          title="Activities Completed" 
          value={userPerformance.length} 
          change={12}
          icon={<BookOpen className="h-6 w-6 text-orange-500" />}
        />
      </div>

      {/* Progress Chart */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Progress Over Time</h2>
        <ProgressChart data={mockAnalyticsReport.progressOverTime} />
      </div>

      {/* Activity Breakdown */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Activity Breakdown</h2>
        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time Spent
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completion
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {userPerformance.map((performance, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {performance.activity.replace('_', ' ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(performance.timestamp).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {performance.score ? `${performance.score}%` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {performance.timeSpent ? `${Math.round(performance.timeSpent / 60)} min` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${performance.completionRate}%` }}
                          ></div>
                        </div>
                        <span className="ml-2">{performance.completionRate}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Skill Areas */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Skill Areas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Strengths</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Reading Comprehension</span>
                    <span className="text-sm font-medium text-gray-700">90%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </li>
              <li className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Vocabulary</span>
                    <span className="text-sm font-medium text-gray-700">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </li>
              <li className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Critical Thinking</span>
                    <span className="text-sm font-medium text-gray-700">82%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Areas for Improvement</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Phonological Awareness</span>
                    <span className="text-sm font-medium text-gray-700">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </li>
              <li className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Reading Speed</span>
                    <span className="text-sm font-medium text-gray-700">70%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </li>
              <li className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Spelling</span>
                    <span className="text-sm font-medium text-gray-700">72%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;