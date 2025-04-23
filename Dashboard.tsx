import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Video, PlayCircle, FileQuestion, ChevronRight, Clock, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useContent } from '../contexts/ContentContext';
import { Content } from '../types';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import ContentCard from '../components/content/ContentCard';

const Dashboard: React.FC = () => {
  const { authState } = useAuth();
  const { recommendedContent, userPerformance } = useContent();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (authState.status === 'unauthenticated') {
      navigate('/login');
    }
  }, [authState.status, navigate]);
  
  if (authState.status !== 'authenticated') {
    return null;
  }
  
  const lastActivity = userPerformance[userPerformance.length - 1];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {authState.user?.username}!</h1>
          <p className="mt-1 text-gray-600">
            Continue your learning journey with personalized content and exercises.
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-none">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="rounded-full p-3 bg-blue-100">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Study Time This Week</p>
                <p className="text-2xl font-bold text-gray-900">4.5 hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-none">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="rounded-full p-3 bg-purple-100">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Average Score</p>
                <p className="text-2xl font-bold text-gray-900">82.5%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-none">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="rounded-full p-3 bg-green-100">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Activities Completed</p>
                <p className="text-2xl font-bold text-gray-900">{userPerformance.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Continue Learning */}
      {lastActivity && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Continue Learning</h2>
          </div>
          <Card className="bg-white overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 bg-gradient-to-r from-blue-100 to-purple-100 p-6 flex flex-col justify-center">
                <h3 className="text-xl font-semibold mb-2">Resume where you left off</h3>
                <p className="text-gray-700 mb-4">
                  Continue your progress with {lastActivity.activity.replace('_', ' ')}
                </p>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/content/${lastActivity.activity}`)}
                  className="w-full md:w-auto inline-flex items-center"
                >
                  Continue
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              <div className="md:w-2/3 p-6">
                <div className="mb-4">
                  <div className="flex items-center">
                    <div className="w-full">
                      <div className="flex justify-between mb-1 items-center">
                        <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                        <span className="text-sm font-medium text-gray-700">
                          {lastActivity.completionRate}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${lastActivity.completionRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Time Spent</p>
                    <p className="text-lg font-semibold">
                      {lastActivity.timeSpent ? Math.round(lastActivity.timeSpent / 60) : 0} minutes
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Difficulty</p>
                    <p className="text-lg font-semibold capitalize">
                      {lastActivity.difficultyLevel || 'medium'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Recommended Content */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Recommended For You</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/library')}
          >
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedContent.map((content: Content) => (
            <ContentCard key={content.id} content={content} />
          ))}
        </div>
      </div>

      {/* Content By Category */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Explore By Category</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:shadow-md transition-all duration-300 cursor-pointer" onClick={() => navigate('/library?topic=reading_strategies')}>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="rounded-full p-3 bg-blue-100">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Reading Strategies</h3>
                <p className="text-sm text-gray-600">Improve your reading skills</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all duration-300 cursor-pointer" onClick={() => navigate('/library?topic=phonological_awareness')}>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="rounded-full p-3 bg-purple-100">
                <PlayCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Phonological Awareness</h3>
                <p className="text-sm text-gray-600">Sound recognition exercises</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all duration-300 cursor-pointer" onClick={() => navigate('/library?topic=reading_comprehension')}>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="rounded-full p-3 bg-green-100">
                <FileQuestion className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Reading Comprehension</h3>
                <p className="text-sm text-gray-600">Understand what you read</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all duration-300 cursor-pointer" onClick={() => navigate('/library?topic=auditory_processing')}>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="rounded-full p-3 bg-red-100">
                <Video className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold">Auditory Processing</h3>
                <p className="text-sm text-gray-600">Videos and audio lessons</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;